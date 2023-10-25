import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from '@draft-js-plugins/mention';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EMOTION_LIST } from 'constants/HomeConstant';
import { EditorState, convertFromRaw } from 'draft-js';

import React, { useMemo, useState } from 'react';

import { CommentPostResponse } from 'types/responses/PostResponse';

type CommentTypeProps = {
    comment: CommentPostResponse,
    onReply: (comment: CommentPostResponse) => void
}

const SingleComment: React.FC<CommentTypeProps> = (props) => {
    const { comment } = props;
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(convertFromRaw(JSON.parse(comment.text)))
    );

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


    return (
        <div>
            <div className="flex p-2">
                <div className="min-w-[2.5rem] min-h-[2.5rem] w-10 h-10 mt-2">
                    <img className="w-full h-full rounded-full" src={'https://random.imagecdn.app/500/200'} alt="Not found" />
                </div>
                <div className="ml-2 flex">
                    <div className="mb-2">
                        <div className="rounded-lg p-2 bg-gray-100">
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
                        </div>
                        <div className="flex">
                            <div className="has-tooltip mr-4 font-medium cursor-pointer relative">
                                <span>Like</span>
                                <div className="tooltip flex absolute bottom-full rounded-full bg-white shadow-md p-1 items-center justify-between">
                                    {
                                        EMOTION_LIST.map(item => (
                                            <div key={item.id}className="w-10 h-10 p-1 relative">
                                                <img className="w-full h-full rounded-full" src={item.gif} alt='Not found' />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div onClick={() => {
                                props.comment.commentId && props.onReply(props.comment);
                            }} className="mr-4 font-medium cursor-pointer">Reply</div>
                            <div className="mr-4 font-medium cursor-pointer">Share</div>
                            <div className="font-light">1 minute before</div>
                        </div>
                    </div>
                    <div className="ml-2 mt-2 rounded hover:bg-gray-100 w-5 h-5 flex justify-center items-center rounded-full cursor-pointer">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SingleComment;