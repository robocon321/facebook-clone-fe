import { Dispatch, SetStateAction } from "react";
import { AccountResponse } from "types/responses/AccountResponse";
import { PostResponse } from "types/responses/PostResponse";

export type NewsFeedContextType = {
  newsFeedData: DataStateType;
  setNewsFeedData: Dispatch<SetStateAction<DataStateType>>;
  newsFeedControl: ControlStateType;
  setNewsFeedControl: Dispatch<SetStateAction<ControlStateType>>;
  newsFeedEmotions: EmotionType[];
  setNewsFeedPost: (post: PostResponse) => void;
};

export type DataStateType = {
  posts: PostResponse[];
};

export type ControlStateType = {
  page: number;
};

export type EmotionType = {
  emotion_id: number;
  text: string;
  imageUrl: string;
};

export type CommentInputType = {
  commentId?: number;
  text: string;
  file?: File;
  fileType?: string;
  fileUrl?: string;
  tags: AccountResponse[];
  parentId?: number;
};
