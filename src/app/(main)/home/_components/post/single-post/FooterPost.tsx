import Editor from '@draft-js-plugins/editor';
import createEmojiPlugin, { defaultTheme } from '@draft-js-plugins/emoji';
import createMentionPlugin from '@draft-js-plugins/mention';
import { EditorState, convertToRaw, getDefaultKeyBinding } from 'draft-js';

import { faFaceSmile, faImage, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Client } from '@stomp/stompjs';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { EMOTION_LIST } from 'app/(main)/home/_constant/HomeConstant';
import { NewsFeedContext } from 'app/(main)/home/_providers/NewFeedsProvider';
import { CommentInputType, NewsFeedContextType } from 'app/(main)/home/_type/NewsFeedType';
import { AppContext } from 'app/_providers/AppProvider';
import { AppContextType } from 'app/_type/AppType';
import SingleComment from 'components/limb/comment/SingleComment';
import Entry from 'components/limb/editor/custom/EntryComponent';
import { getAccountFriendshipAndStatus } from 'services/AccountService';
import { createComment } from 'services/CommentService';
import { CommentPostRequest } from 'types/requests/CommentPostRequest';
import { PageRequest } from 'types/requests/PageRequest';
import { CommentPostResponse, EmotionCommentResponse, PostResponse } from 'types/responses/PostResponse';
import createMentionEntities from 'utils/CreateMention';
import { convertToBlobFile } from 'utils/FileUtils';
import { AccountResponse } from 'types/responses/AccountResponse';

type PostTypeProps = {
    post: PostResponse
}

type SubscriptionType = {
    id: string,
    destination: string
}

const defaultCommentInput = {
    text: '',
    tags: [],
}

const FooterPost: React.FC<PostTypeProps> = (props) => {
    const { setNewsFeedPost } = useContext(NewsFeedContext) as NewsFeedContextType;
    const { appState } = useContext(AppContext) as AppContextType;
    const { post } = props;
    const [commentInput, setCommentInput] = useState<CommentInputType>(defaultCommentInput);
    const [emotionCounts, setEmotionCounts] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [accountEmotionId, setAccountEmotionId] = useState(-1);
    const [isFocus, setIsFocus] = useState(false);
    var [client, setClient] = useState<Client | null>(null);
    var [subcriptions, setSubcriptions] = useState<SubscriptionType[]>([]);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [suggestions, setSuggestions] = useState<AccountResponse[]>([]);
    const [openEditor, setOpenEditor] = useState(false);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(() => {
        var newEmotionCounts = [0, 0, 0, 0, 0, 0, 0];
        var newAccountEmotionId = -1;
        if (post.emotions) {
            post.emotions.forEach(item => {
                const emotionIndex = EMOTION_LIST.find(e => e.type == item.type)?.id;
                if (emotionIndex != null) {
                    newEmotionCounts[emotionIndex]++;
                    if (item.account.accountId == appState.data.user?.accountId) {
                        newAccountEmotionId = emotionIndex;
                    }
                }
            })
        }
        setAccountEmotionId(newAccountEmotionId);
        setEmotionCounts(newEmotionCounts);
    }, [post.emotions]);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        subcriptions.forEach(item => {
            client?.unsubscribe(item.id, {
                destination: item.destination + post.postId
            });    
        });
        client?.deactivate();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {
            const stompClient = new Client({
                brokerURL: "ws://localhost:9006/realtime",
                connectHeaders: {
                    token: token
                },
                reconnectDelay: 2000,
            });

            stompClient.activate();

            stompClient.onConnect = () => {
                const focusSubscriptionId = stompClient.subscribe("/user/topic/comment-post/check-focus/" + post.postId, (message) => {
                    const countFocusing = Number.parseInt(message.body);
                    setIsFocus(countFocusing > 0);
                }, {
                    token: token
                }).id;

                subcriptions.push({
                    id: focusSubscriptionId,
                    destination: "/user/topic/comment-post/check-focus/"
                });

                const createCommentSubcriptionId = stompClient.subscribe("/topic/comment-post/create/" + post.postId, (message) => {
                    const json = JSON.parse(message.body);
                    setNewsFeedPost({
                        ...post,
                        comments: json
                    });
                }, {
                    token: token
                }).id;

                subcriptions.push({
                    id: createCommentSubcriptionId,
                    destination: "/topic/comment-post/create/"
                });

                const emotionPostSubcriptionId = stompClient.subscribe("/topic/emotion-post/" + post.postId, (message) => {
                    const emotions = JSON.parse(message.body);
                    post.emotions = emotions;
                    setNewsFeedPost(post);
                }, {
                    token: token
                }).id;

                subcriptions.push({
                    id: emotionPostSubcriptionId,
                    destination: "/topic/emotion-post/"
                });

                const emotionCommentSubcriptionId = stompClient.subscribe("/topic/emotion-comment/" + post.postId, (message) => {
                    const body = JSON.parse(message.body);
                    const commentId: number = body.commentId;
                    const emotions: EmotionCommentResponse[] = body.data;
                    const previousComments = post.comments;
                    if(previousComments) {
                        const currentComment = previousComments.find(item => item.commentId == commentId);
                        if(currentComment) {
                            currentComment.emotions = emotions;
                        }
                    }
                    setNewsFeedPost(post);
                }, {
                    token: token
                }).id;

                subcriptions.push({
                    id: emotionCommentSubcriptionId,
                    destination: "/topic/emotion-comment/"
                });

                setSubcriptions(subcriptions);

                setClient(stompClient);
            }
            return () => {
                client?.deactivate();
                subcriptions.forEach(item => {
                    client?.unsubscribe(item.id, {
                        destination: item.destination + post.postId
                    });    
                })
                window.removeEventListener('beforeunload', handleBeforeUnload);
            }
        }

    }, []);

    const onKeyEnterComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter' && client?.active) {
        }
    };


    const onSearchMention = useCallback(({ value }: { value: string }) => {
        const pageRequest: PageRequest = {
            page: 0,
            size: 5,
            sortBy: [],
            sortOrder: []
        }
        getAccountFriendshipAndStatus('ACCEPTED', value, [], pageRequest)
            .then(response => {
                setSuggestions(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const onSendEmotion = (e: React.MouseEvent<HTMLDivElement>, type: string) => {
        e.stopPropagation();
        if (client?.active) {
            client.publish({
                destination: "/app/emotion-post/create/" + post.postId,
                body: type
            });
        }
    }

    const onClickLikeButton = () => {
        if (client?.active) {
            if (post.emotions?.find(item => appState.data.user?.accountId == item.account.accountId)) {
                client.publish({
                    destination: "/app/emotion-post/delete/" + post.postId
                });
            } else {
                client.publish({
                    destination: "/app/emotion-post/create/" + post.postId,
                    body: 'LIKE'
                });
            }
        }
    }

    const onFocusComment = () => {
        if (client?.active) {
            client.publish({
                destination: "/app/comment-post/check-focus/" + post.postId,
                body: 'true'
            });
        }
    }

    const onBlurComment = () => {
        if (client?.active) {
            client.publish({
                destination: "/app/comment-post/check-focus/" + post.postId,
                body: 'false'
            });
        }
    }

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length == undefined) return;
        upload(event.target.files);
    }

    const upload = (fileList: FileList) => {
        const file = fileList[0];
        const { blobUrl, type } = convertToBlobFile(file);
        setCommentInput({
            ...commentInput,
            fileType: type,
            file: file,
            fileUrl: blobUrl
        });
    }

    const onResetFileComment = () => {
        setCommentInput({
            ...commentInput,
            fileType: undefined,
            file: undefined,
            fileUrl: undefined
        })
    }

    const { MentionSuggestions, plugins, EmojiSelect } = useMemo(() => {
        const mentionPlugin = createMentionPlugin({
            mentionComponent(mentionProps) {
                return (
                    <span
                        className={"font-bold"}
                    >
                        {mentionProps.children}
                    </span>
                );
            },
        });
        const { MentionSuggestions } = mentionPlugin;

        defaultTheme.emojiSelectButton = "";
        defaultTheme.emojiSelectButtonPressed = "";

        const emojiPlugin = createEmojiPlugin({
            selectButtonContent: (
                <div className="flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-full w-[30px] h-[30px]">
                    <FontAwesomeIcon icon={faFaceSmile} />
                </div>
            ),
            theme: defaultTheme
        });

        const { EmojiSelect } = emojiPlugin;

        const plugins = [mentionPlugin, emojiPlugin];
        return { plugins, MentionSuggestions, EmojiSelect };
    }, []);

    const onOpenChange = useCallback((_open: boolean) => {
        setOpenEditor(_open);
    }, []);

    function keyBindingFn(e: any) {
        if (e.key === 'Enter') {
            return 'enter' // name this whatever you want
        }

        return getDefaultKeyBinding(e);
    }

    const saveComment = () => {
        if(client?.active && isEnableComment()) {
            const contentState = editorState.getCurrentContent();
            const raw = convertToRaw(contentState);
            const convertToString = JSON.stringify(raw);
            let mentionedAccounts = [];
            for (let key in raw.entityMap) {
                const ent = raw.entityMap[key];
                if (ent.type === "mention") {
                    mentionedAccounts.push(ent.data.mention.id);
                }
            }
    
            const request: CommentPostRequest = {
                text: convertToString,
                postId: post.postId,
                file: commentInput.file,
                parentId: commentInput.parentId,
                mentionedAccounts: mentionedAccounts.toString()
            }
    
            createComment(request)
                .then(response => console.log(response))
                .catch(error => console.error(error));
    
            setEditorState(EditorState.createEmpty());
            setCommentInput(defaultCommentInput);
    
        }
    }

    function handleKeyCommand(command: string) {
        if (command === 'enter') {
            saveComment();
            return 'handled'
        }

        return 'not-handled'
    }

    const onReply = (comment: CommentPostResponse) => {
        if(comment.account.accountId == appState.data.user?.accountId) return ;
        if(editorState.getCurrentContent().hasText()) return ;
        const newContentEditor = createMentionEntities(editorState, 
            {
                id: comment.account.accountId,
                name: comment.account.lastName + " " + comment.account.firstName,
                avatar: 'https://random.imagecdn.app/500/200'
            }
        )
        const newEditorState = EditorState.createWithContent(newContentEditor);
        setEditorState(newEditorState);
        setCommentInput({
            ...commentInput,
            parentId: comment.commentId
        });
    }

    const isEnableComment = () => {
        return editorState.getCurrentContent().hasText() || commentInput.file
    }

    return (
        <div>
            <div className="w-full flex flex-col space-y-2 p-2 px-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-300 text-gray-500 text-sm">
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <div className="focus:outline-none flex items-center justify-center">
                                {
                                    EMOTION_LIST.map(item => {
                                        return emotionCounts[item.id] > 0 ? (
                                            <div key={item.id} className={"w-5 w-5" + ((item.id > 0 && emotionCounts.slice(0, item.id).find(i => i > 0)) ? " ml-[-5px]" : "")}>
                                                <img className="w-full h-full rounded-full" src={item.png} alt='Not found' />
                                            </div>
                                        ) : <div key={item.id}></div>
                                    })
                                }
                                {
                                    post.emotions && post.emotions.length > 0 && (post.emotions.length == 1 ? (
                                        <div className='ml-1'>
                                            {post.emotions[0].account.lastName + " " + post.emotions[0].account.firstName}
                                        </div>
                                    ) : (
                                        <div> {"\u00A0" + post.emotions?.length}</div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* <button>{post.comments} Comments</button>
            <button>{post.shares} Shares</button> */}
                        <button>{post.comments? post.comments.length : 0} Comments</button>
                        <button>{0} Shares</button>
                    </div>
                </div>
                <div className="flex space-x-3 text-gray-500 text-sm font-thin border-b pb-2">
                    <button
                        onClick={() => onClickLikeButton()}
                        className={
                            "has-tooltip relative flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md " +
                            (accountEmotionId >= 0 ? EMOTION_LIST[accountEmotionId].bg : '')
                        }>
                        {
                            accountEmotionId >= 0 ? (
                                <div className='w-5 h-5 '>
                                    <img className='w-full h-full rounded-full' src={EMOTION_LIST[accountEmotionId].png} alt="Not found" />
                                </div>
                            ) : (
                                <div className='w-5 h-5 rounded-full'>
                                    <i className="fas fa-thumbs-up"></i>
                                </div>
                            )
                        }
                        {
                            accountEmotionId >= 0 ? (
                                <div>
                                    <p className={"font-semibold " + EMOTION_LIST[accountEmotionId].color}>{EMOTION_LIST[accountEmotionId].text}</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="font-semibold">Like</p>
                                </div>
                            )
                        }
                        <div className="tooltip flex absolute bottom-full rounded-full bg-white shadow-md p-1 items-center justify-between">
                            {
                                EMOTION_LIST.map(item => (
                                    <div key={item.id} onClick={(e) => {
                                        onSendEmotion(e, item.type);
                                    }} className="w-10 h-10 p-1 relative">
                                        <img className="w-full h-full rounded-full" src={item.gif} alt='Not found' />
                                    </div>
                                ))
                            }
                        </div>
                    </button>
                    <button className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
                        <div>
                            <i className="fas fa-comment"></i>
                        </div>
                        <div>
                            <p className="font-semibold">Comment</p>
                        </div>
                    </button>
                    <button className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
                        <div>
                            <i className="fas fa-share"></i>
                        </div>
                        <div>
                            <p className="font-semibold">Share</p>
                        </div>
                    </button>
                </div>
            </div>
            <div>
                {
                    post.comments && post.comments.filter(item => item.parentId == null)
                    .map((item) => <SingleComment key={item.commentId} client={client} postId={post.postId} comments={post.comments ? post.comments : []} onReply={onReply} comment={item} />)
                }
                {
                    isFocus && (
                        <div className="flex items-center p-4 w-full">
                            <div className="mr-2">Someone is typing</div>
                            <div className="w-[50px] flex justify-between">
                                <div className="bg-gray-600 w-2 h-2 rounded-full animate-bounce blue-circle"></div>
                                <div className="bg-gray-600 w-2 h-2 rounded-full animate-bounce green-circle"></div>
                                <div className="bg-gray-600 w-2 h-2 rounded-full animate-bounce red-circle"></div>
                            </div>
                        </div>
                    )
                }
                <div className="flex justify-between p-2">
                    <div className="min-w-[2.5rem] min-h-[2.5rem] w-10 h-10 mt-2">
                        <img className="w-full h-full rounded-full" src={'https://random.imagecdn.app/500/200'} alt="Not found" />
                    </div>
                    <div className="ml-2 bg-gray-100 rounded-lg p-2 flex-grow">
                        <div onFocus={onFocusComment} onBlur={onBlurComment} className="ml-2 bg-gray-100 rounded-lg p-2 flex-grow flex">
                            <div className="flex-grow w-full p-2 outline-none bg-gray-100">
                                <Editor
                                    keyBindingFn={keyBindingFn}
                                    handleKeyCommand={handleKeyCommand}
                                    editorState={editorState}
                                    onChange={setEditorState}
                                    placeholder="Enter your comment"
                                    plugins={plugins}
                                />
                                <MentionSuggestions
                                    open={openEditor}
                                    onOpenChange={onOpenChange}
                                    suggestions={suggestions.map(item => ({
                                        id: item.accountId,
                                        name: `${item.firstName} ${item.lastName}`,
                                        avatar: 'https://random.imagecdn.app/500/200'
                                    }))}
                                    onSearchChange={onSearchMention}
                                    onAddMention={() => {
                                        // get the mention object selected
                                    }}
                                    entryComponent={Entry}
                                />
                            </div>
                            <div className='flex w-[120px] items-center justify-between mx-2'>
                                <div className="relative">
                                    <EmojiSelect />
                                </div>
                                <div onClick={() => inputFileRef.current?.click()} className="flex items-center justify-center hover:bg-gray-200 rounded-full w-[30px] h-[30px] cursor-pointer">
                                    <FontAwesomeIcon icon={faImage} />
                                    <input
                                        type="file"
                                        onChange={onChangeFile}
                                        hidden
                                        accept="image/*, video/*"
                                        ref={inputFileRef}
                                    />

                                </div>
                                <div onClick={() => saveComment()} className={"flex items-center justify-center hover:bg-gray-200 rounded-full w-[30px] h-[30px] cursor-pointer" + (isEnableComment() ? " text-blue-700" : "")}>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </div>
                            </div>
                        </div>
                        {
                            commentInput.fileUrl && (
                                <div className="p-2 max-w-[250px] m-4 relative">
                                    {
                                        commentInput.fileType?.startsWith("video") ? (
                                            <video controls>
                                                <source src={`${commentInput.fileUrl}`} type={"video/mp4"} />
                                            </video>
                                        ) : (
                                            <img className="w-full h-full" src={`${commentInput.fileUrl}`} alt="Not found" />
                                        )
                                    }
                                    <div onClick={() => onResetFileComment()} className="absolute top-0 right-0 translate-x-1/2 translate-y-[-50%] flex items-center justify-center bg-gray-200 rounded-full w-[30px] h-[30px] cursor-pointer">
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FooterPost;