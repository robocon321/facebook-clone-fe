import Post from "app/(main)/home/_components/post/single-post";
import { NewsFeedContext } from "app/(main)/home/_providers/NewFeedsProvider";
import React, { useContext } from "react";
import { NewsFeedContextType } from "app/(main)/home/_type/NewsFeedType";

type TPostView = "gridView" | "listView";

interface IProps {
  postsView?: TPostView;
}

const PostContainer: React.FC<IProps> = (props) => {
  const { postsView } = props;
  const { newsFeedData } = useContext(NewsFeedContext) as NewsFeedContextType;
  return (
    <div className="mt-4 w-full h-full">
      <div
        className={`grid ${
          postsView === "gridView" ? "grid-cols-2" : "grid-cols-1"
        } gap-2`}
      >
        {newsFeedData.posts.length ? (
          newsFeedData.posts.map((post, idx) => (
            <Post key={post.postId} post={post} />
          ))
        ) : (
          <p>No posts yet!</p>
        )}
      </div>
    </div>
  );
};

export default PostContainer;
