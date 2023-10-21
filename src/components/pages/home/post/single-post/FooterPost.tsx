import { Client } from '@stomp/stompjs';
import { EMOTION_LIST } from 'constants/HomeConstant';
import { AppContext } from 'providers/AppProvider';
import { NewsFeedContext } from 'providers/home/NewFeedsProvider';
import React, { useContext, useEffect, useState } from 'react';
import { AppContextType } from 'types/pages/AppType';
import { NewsFeedContextType, PostResponse } from 'types/pages/home/NewsFeedType';

type PostTypeProps = {
    post: PostResponse
}

const FooterPost: React.FC<PostTypeProps> = (props) => {
    const { setNewsFeedPost } = useContext(NewsFeedContext) as NewsFeedContextType;
    const { appState } = useContext(AppContext) as AppContextType;
    const { post } = props;
    const [comments, setComments] = useState<string[]>([]);
    const [client, setClient] = useState<Client | null>(null);
    const [emotionCounts, setEmotionCounts] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [accountEmotionId, setAccountEmotionId] = useState(-1);

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

    useEffect(() => {
        // config stomp
        const token = localStorage.getItem('token');
        if (token) {
            const stompClient = new Client({
                brokerURL: "ws://localhost:9006/realtime",
                connectHeaders: {
                    token: token
                },
                reconnectDelay: 2000,
            });

            // Connect to the WebSocket server
            stompClient.activate();

            stompClient.onConnect = () => {
                stompClient.subscribe("/topic/comment-post/" + post.postId, (message) => {
                    setComments((previous) => [...previous, message.body]);
                });
                stompClient.subscribe("/topic/emotion-post/" + post.postId, (message) => {
                    const emotions = JSON.parse(message.body);
                    post.emotions = emotions;
                    setNewsFeedPost(post);
                });
                setClient(stompClient);
            }
            return () => {
                client?.deactivate();
            }
        }

    }, []);

    const onSendComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter' && client) {
            const message = e.currentTarget.value;
            client.publish({
                destination: "/app/comment-post/create/" + post.postId,
                body: message
            });
        }
    };

    const onSendEmotion = (e: React.MouseEvent<HTMLDivElement>, type: string) => {
        e.stopPropagation();
        if (client) {
            client.publish({
                destination: "/app/emotion-post/create/" + post.postId,
                body: type
            });
        }
    }

    const onClickLikeButton = () => {
        if (client) {
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
                        <button>{0} Comments</button>
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
                    comments.map((item, index) => (
                        <div key={index} className="flex justify-between p-2">
                            <div className="min-w-[2.5rem] min-h-[2.5rem] w-10 h-10 mt-2">
                                <img className="w-full h-full rounded-full" src={'https://random.imagecdn.app/500/200'} alt="Not found" />
                            </div>
                            <div className="ml-2 bg-gray-100 rounded-lg p-2 flex-grow">
                                <div><a href="#"><b>Nguyen Thanh Nhat</b></a></div>
                                <p>{item}</p>
                            </div>
                        </div>
                    ))
                }
                <div className="flex justify-between p-2">
                    <div className="min-w-[2.5rem] min-h-[2.5rem] w-10 h-10 mt-2">
                        <img className="w-full h-full rounded-full" src={'https://random.imagecdn.app/500/200'} alt="Not found" />
                    </div>
                    <div className="ml-2 bg-gray-100 rounded-lg p-2 flex-grow">
                        <input type="text" onKeyUp={onSendComment} placeholder="Enter your comment" className="w-full p-2 outline-none bg-gray-100" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterPost;