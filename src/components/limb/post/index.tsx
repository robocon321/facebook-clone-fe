import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { ImagePostResponse, NewsFeedContextType, PostResponse, VideoPostResponse } from 'types/pages/home/NewsFeedType';
import { NewsFeedContext } from 'providers/home/NewFeedsProvider';

type PostTypeProps = {
  post: PostResponse
}

const Post: React.FC<PostTypeProps> = (props) => {
  const { newsFeedEmotions } = useContext(NewsFeedContext) as NewsFeedContextType;
  const { post } = props;
  const emotion = newsFeedEmotions.find(item => item.emotion_id == post.emotionId);
  const [files, setFiles] = useState<(ImagePostResponse | VideoPostResponse)[]>([]);

  useEffect(() => {
    let arr: (ImagePostResponse | VideoPostResponse)[] = [];
    if (post.images) arr.push(...post.images);
    if (post.videos) arr.push(...post.videos);
    arr = arr.sort((a, b) => a.modTime > b.modTime ? 1 : -1);
    console.log(arr);
    setFiles(arr);
  }, []);

  const loadWidth = (length: number, index: number) => {
    if (length == 1 || (length == 4 && index == 3)) {
      return "w-full";
    }
    if (length == 2 || (length == 5 && index > 2)) {
      return "w-1/2"
    }
    if (length == 3 || (length > 5 && index > 2) || (length > 3 && index < 3)) {
      return "w-1/3"
    }
  }

  return (
    <div className="w-full shadow h-auto bg-white rounded-md">
      <div className="flex items-center space-x-2 p-2.5 px-4">
        <div className="min-w-[2.5rem] min-h-[2.5rem] w-10 h-10">
          <img src={post.account.profilePictureUrl ? post.account.profilePictureUrl : 'https://random.imagecdn.app/500/200'} className="w-full h-full rounded-full" alt="dp" />
        </div>
        <div className="flex-grow flex flex-col">
          <div className="flex flex-wrap">
            <a className="hover:underline" href="#"><b>
              {post.account.lastName + " " + post.account.firstName}
            </b></a>
            {emotion && (
              <div className="flex">
                <span className="mx-1">is feeling</span>
                <span className="mx-1">{emotion.text}</span>
                <img className="mx-1 w-[25px] h-[25px]" src={emotion.imageUrl} alt="Not found" />
              </div>
            )}
            {
              post.checkin && (
                <div className="flex">
                  <span className="mx-1">is living</span>
                  <span className="mx-1 hover:underline"><a href="#"><b>{post.checkin.address + ", " + post.checkin.city + ", " + post.checkin.country}</b></a></span>
                </div>
              )
            }
            {
              post.tags && (
                <>
                  {post.tags.length > 0 && <span className='mx-1'>with</span>}
                  {
                    post.tags.slice(0, 3).map((item, index) => {
                      return (
                        <div key={item.accountId}><a className="hover:underline" href="#"><b>
                          {item.lastName + " " + item.firstName + (index < 2 && post.tags && post.tags.length - 1 != index ? ", " : " ")}
                        </b></a></div>
                      )
                    })
                  }
                  {post.tags.length > 3 && <li><span className='mx-1'>and</span><a className="hover:underline" href="#"><b> {post.tags.length - 3} other people</b></a></li>}
                </>
              )
            }
          </div>
          <span className="text-xs font-thin text-gray-400">
            {moment(post.modTime).fromNow()}
          </span>
        </div>
        <div className="w-8 h-8">
          <button className="w-full h-full hover:bg-gray-100 rounded-full text-gray-400 focus:outline-none">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
      {post.text ? (
        <div className="mb-1">
          <p className="text-gray-700 max-h-10 truncate px-3 text-sm">
            {post.text}
          </p>
        </div>
      ) : null}
      <div className="flex flex-wrap">
        {
          files.length <= 3 ? (
            files.map((item, index) => "imagePostId" in item ? (
              <div className={"cursor-pointer h-76 max-h-100 p-4 " + loadWidth(files.length, index)}>
                <img
                  src={process.env.BACKEND_URL + "/file-management/" + item.fileUrl}
                  alt="Not found"
                  className="w-full h-76 max-h-100 object-cover"
                />
              </div>
            ) : (
              <div className={"cursor-pointer h-76 max-h-100 p-4 " + loadWidth(files.length, index)}>
                <video className="w-full" controls>
                  <source src={process.env.BACKEND_URL + "/file-management/" + item.fileUrl} type="video/mp4" />
                </video>
              </div>
            ))
          ) : (
            <>
              {
                files.slice(0, 2).map((item, index) => "imagePostId" in item ? (
                  <div className={"cursor-pointer h-76 max-h-100 p-4 " + loadWidth(files.length, index)}>
                    <img
                      src={process.env.BACKEND_URL + "/file-management/" + item.fileUrl}
                      alt="Not found"
                      className="w-full h-76 max-h-100 object-cover"
                    />
                  </div>
                ) : (
                  <div className={"cursor-pointer h-76 max-h-100 p-4 " + loadWidth(files.length, index)}>
                    <video className="w-full" controls>
                      <source src={process.env.BACKEND_URL + "/file-management/" + item.fileUrl} type="video/mp4" />
                    </video>
                  </div>
                ))
              }
                  <div className="cursor-pointer h-76 max-h-100 p-4 w-1/3 text-lg bg-black text-white flex justify-center items-center">
                    {"+ " + (files.length - 2)}
                  </div>

            </>
          )
        }

      </div>

      <div className="w-full flex flex-col space-y-2 p-2 px-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-300 text-gray-500 text-sm">
          <div className="flex items-center">
            <div className="flex items-center">
              <button className="focus:outline-none flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white">
                <i style={{ fontSize: 10 }} className="fas fa-heart"></i>
              </button>
              <button className="focus:outline-none flex items-center justify-center w-4 h-4 rounded-full bg-primary text-white">
                <i style={{ fontSize: 10 }} className="fas fa-thumbs-up"></i>
              </button>
              <button className="focus:outline-none flex items-center justify-center w-4 h-4 rounded-full bg-yellow-500 text-white">
                <i style={{ fontSize: 10 }} className="fas fa-surprise"></i>
              </button>
              <div className="ml-1">
                {/* <p>{post.likes}</p> */}
                <p>{0}</p>
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
        <div className="flex space-x-3 text-gray-500 text-sm font-thin">
          <button className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
            <div>
              <i className="fas fa-thumbs-up"></i>
            </div>
            <div>
              <p className="font-semibold">Like</p>
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
    </div>
  );
};

export default Post;
