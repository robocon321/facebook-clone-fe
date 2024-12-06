import { Client } from "@stomp/stompjs";
import { Dispatch, SetStateAction } from "react";
import { AccountResponse } from "types/responses/AccountResponse";
import { ArticleResponse } from "types/responses/ArticleResponse";

export type NewsFeedContextType = {
  newsFeedData: DataStateType;
  setNewsFeedData: Dispatch<SetStateAction<DataStateType>>;
  newsFeedControl: ControlStateType;
  setNewsFeedControl: Dispatch<SetStateAction<ControlStateType>>;
  newsFeedEmotions: EmotionType[];
  setNewsFeedArticle: (article: ArticleResponse) => void;
  commentClient: Client | null;
  articleClient: Client | null;
};

export type DataStateType = {
  articles: ArticleResponse[];
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
