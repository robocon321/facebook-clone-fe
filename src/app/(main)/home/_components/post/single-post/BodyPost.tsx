import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ImagePostResponse,
  PostResponse,
  VideoPostResponse,
} from "types/responses/PostResponse";

type PostTypeProps = {
  post: PostResponse;
};

const BodyPost: React.FC<PostTypeProps> = (props) => {
  const [files, setFiles] = useState<(ImagePostResponse | VideoPostResponse)[]>(
    []
  );
  const { post } = props;

  useEffect(() => {
    let arr: (ImagePostResponse | VideoPostResponse)[] = [];
    if (post.images) arr.push(...post.images);
    if (post.videos) arr.push(...post.videos);
    arr = arr.sort((a, b) => (a.modTime > b.modTime ? 1 : -1));
    setFiles(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadWidth = (length: number, index: number) => {
    if (length == 1 || (length == 4 && index == 3)) {
      return "w-full";
    }
    if (length == 2 || (length == 5 && index > 2)) {
      return "w-1/2";
    }
    if (length == 3 || (length > 5 && index > 2) || (length > 3 && index < 3)) {
      return "w-1/3";
    }
  };

  return (
    <div className="flex flex-wrap">
      {files.length <= 3 ? (
        files.map((item, index) =>
          "imagePostId" in item ? (
            <div
              key={item.imagePostId}
              className={
                "cursor-pointer h-76 max-h-100 p-4 " +
                loadWidth(files.length, index)
              }
            >
              <Image
                src={
                  process.env.BACKEND_URL + "/file-management/" + item.fileUrl
                }
                alt="Not found"
                className="w-full h-76 max-h-100 object-cover"
              />
            </div>
          ) : (
            <div
              key={item.videoId}
              className={
                "cursor-pointer h-76 max-h-100 p-4 " +
                loadWidth(files.length, index)
              }
            >
              <video className="w-full" controls>
                <source
                  src={
                    process.env.BACKEND_URL + "/file-management/" + item.fileUrl
                  }
                  type="video/mp4"
                />
              </video>
            </div>
          )
        )
      ) : (
        <>
          {files.slice(0, 2).map((item, index) =>
            "imagePostId" in item ? (
              <div
                key={item.imagePostId}
                className={
                  "cursor-pointer h-76 max-h-100 p-4 " +
                  loadWidth(files.length, index)
                }
              >
                <Image
                  src={
                    process.env.BACKEND_URL + "/file-management/" + item.fileUrl
                  }
                  alt="Not found"
                  className="w-full h-76 max-h-100 object-cover"
                />
              </div>
            ) : (
              <div
                key={item.videoId}
                className={
                  "cursor-pointer h-76 max-h-100 p-4 " +
                  loadWidth(files.length, index)
                }
              >
                <video className="w-full" controls>
                  <source
                    src={
                      process.env.BACKEND_URL +
                      "/file-management/" +
                      item.fileUrl
                    }
                    type="video/mp4"
                  />
                </video>
              </div>
            )
          )}
          <div className="cursor-pointer h-76 max-h-100 p-4 w-1/3 text-lg bg-black text-white flex justify-center items-center">
            {"+ " + (files.length - 2)}
          </div>
        </>
      )}
    </div>
  );
};

export default BodyPost;
