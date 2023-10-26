import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from '@draft-js-plugins/mention';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Client } from '@stomp/stompjs';
import { EMOTION_LIST } from 'app/(main)/home/_constant/HomeConstant';
import { EditorState, convertFromRaw } from 'draft-js';
import moment from 'moment';
import { AppContext } from 'app/_providers/AppProvider';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContextType } from 'app/_type/AppType';

import { CommentPostResponse } from 'types/responses/PostResponse';

type CommentTypeProps = {
    comment: CommentPostResponse,
    comments: CommentPostResponse[],
    onReply: (comment: CommentPostResponse) => void,
    client: Client | null,
    postId: number
}

const SingleComment: React.FC<CommentTypeProps> = (props) => {
    const { appState } = useContext(AppContext) as AppContextType;
    const { comment, comments, onReply, client, postId } = props;
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(convertFromRaw(JSON.parse(comment.text)))
    );
    const nestedComments = comments.filter(item => item.parentId == comment.commentId);
    const [accountEmotionId, setAccountEmotionId] = useState(-1);
    const [emotionCounts, setEmotionCounts] = useState([0, 0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        var newEmotionCounts = [0, 0, 0, 0, 0, 0, 0];
        var newAccountEmotionId = -1;
        if (comment.emotions) {
            comment.emotions.forEach(item => {
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
    }, [comment.emotions]);

    const { plugins } = useMemo(() => {
        const mentionPlugin = createMentionPlugin({
            mentionComponent(mentionProps) {
                return (
                    <a href="#" className={"text-blue-500 font-bold"}>
                        {mentionProps.children}
                    </a>
                );
            },
        });

        const plugins = [mentionPlugin];
        return { plugins };
    }, []);

    const onClickLikeButton = () => {
        if (client?.active) {
            if (comment.emotions?.find(item => appState.data.user?.accountId == item.account.accountId)) {
                client.publish({
                    destination: "/app/emotion-comment/delete/" + postId,
                    body: comment.commentId + ""
                });
            } else {
                const message = {
                    commentId: comment.commentId,
                    type: 'LIKE'
                }
                client.publish({
                    destination: "/app/emotion-comment/create/" + postId,
                    body: JSON.stringify(message)
                });
            }
        }
    }

    const onSendEmotion = (e: React.MouseEvent<HTMLDivElement>, type: string) => {
        e.stopPropagation();
        if (client?.active) {
            const message = {
                commentId: comment.commentId,
                type
            }
            client.publish({
                destination: "/app/emotion-comment/create/" + postId,
                body: JSON.stringify(message)
            });
        }
    }


    return (
        <div>
            <div className="flex p-2">
                <div className="min-w-[2.5rem] min-h-[2.5rem] w-10 h-10 mt-2">
                    <img className="w-full h-full rounded-full" src={'https://random.imagecdn.app/500/200'} alt="Not found" />
                </div>
                <div className="ml-2 flex">
                    <div className="mb-2">
                        <div className="relative rounded-lg p-2 bg-gray-100">
                            <div><a href="#"><b>{comment.account.lastName + " " + comment.account.firstName}</b></a></div>
                            <div className="outline-none">
                                <Editor
                                    readOnly
                                    editorState={editorState}
                                    onChange={setEditorState}
                                    placeholder="Enter your comment"
                                    plugins={plugins}
                                />
                            </div>
                            {
                                comment.file && (
                                    <div className="p-2 max-w-[250px] m-4 relative">
                                        {
                                            comment.file.type?.startsWith("video") ? (
                                                <video controls>
                                                    <source src={`http://localhost:9090/file-management/${comment.file.name}`} type={"video/mp4"} />
                                                </video>
                                            ) : (
                                                <img className="w-full h-full" src={`http://localhost:9090/file-management/${comment.file.name}`} alt="Not found" />
                                            )
                                        }
                                    </div>
                                )
                            }
                            <div className="absolute w-10 h-10 right-0 bottom-0 translate-x-1/2 translate-y-1/2 flex items-center justify-center">
                                {
                                    EMOTION_LIST.map(item => {
                                        return emotionCounts[item.id] > 0 ? (
                                            <div key={item.id} className={"w-5 w-5" + ((item.id > 0 && emotionCounts.slice(0, item.id).find(i => i > 0)) ? " ml-[-5px]" : "")}>
                                                <img className="w-full h-full rounded-full" src={item.png} alt='Not found' />
                                            </div>
                                        ) : <div key={item.id}></div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex">
                            <div className="has-tooltip mr-4 font-medium cursor-pointer relative">
                                <span onClick={() => onClickLikeButton()} className={(accountEmotionId >= 0 ? EMOTION_LIST[accountEmotionId].color : '')}>{(accountEmotionId >= 0 ? EMOTION_LIST[accountEmotionId].text : 'Like')}</span>
                                <div className="tooltip flex absolute bottom-full rounded-full bg-white shadow-md p-1 items-center justify-between">
                                    {
                                        EMOTION_LIST.map(item => (
                                            <div onClick={(e) => onSendEmotion(e, item.type)} key={item.id} className="w-10 h-10 p-1 relative">
                                                <img className="w-full h-full rounded-full" src={item.gif} alt='Not found' />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div onClick={() => {
                                onReply(props.comment)
                            }} className="mr-4 font-medium cursor-pointer">Reply</div>
                            <div className="mr-4 font-medium cursor-pointer">Share</div>
                            <div className="font-light">{moment(comment.modTime).fromNow()}</div>
                        </div>
                    </div>
                    <div className="ml-2 mt-2 rounded hover:bg-gray-100 w-5 h-5 flex justify-center items-center rounded-full cursor-pointer">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>
            <div className="ml-8">
                {
                    nestedComments.map((item) => <SingleComment key={item.commentId} client={client} postId={postId} comments={comments} onReply={onReply} comment={item} />)
                }

            </div>
        </div>
    )

}

export default SingleComment;