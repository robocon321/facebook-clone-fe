import React from "react";
import BodyPost from "./BodyPost";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import { PostResponse } from "types/responses/PostResponse";

type PostTypeProps = {
  post: PostResponse;
};

const Post: React.FC<PostTypeProps> = (props) => {
  const { post } = props;
  return (
    <div className="w-full shadow h-auto bg-white rounded-md">
      <HeaderPost post={post} />
      <BodyPost post={post} />
      <FooterPost post={post} />
    </div>
  );
};

export default Post;
