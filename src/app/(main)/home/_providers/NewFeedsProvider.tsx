"use client";

import { Client } from "@stomp/stompjs";
import {
  ControlStateType,
  DataStateType,
  EmotionType,
  NewsFeedContextType,
} from "app/(main)/home/_type/NewsFeedType";
import { AppContext } from "app/_providers/AppProvider";
import { AppContextType } from "app/_type/AppType";
import Loading from "components/limb/loading/Loading";
import { createContext, useContext, useEffect, useState } from "react";
import { recommendArticle } from "services/ArticleService";
import {
  ArticleResponse,
  EmotionCommentResponse,
} from "types/responses/ArticleResponse";

export const NewsFeedContext = createContext<NewsFeedContextType | null>(null);

const defaultControlState: ControlStateType = {
  page: 0,
};

const defaultDataState: DataStateType = {
  articles: [],
};

type SubscriptionType = {
  id: string;
  destination: string;
};

const NewsFeedProvider = (props: any) => {
  const { appState } = useContext(AppContext) as AppContextType;
  const [dataState, setDataState] = useState<DataStateType>(defaultDataState);
  const [controlState, setControlState] =
    useState<ControlStateType>(defaultControlState);
  const [emotions, setEmotions] = useState<EmotionType[]>([]);
  const [articleClient, setArticleClient] = useState<Client | null>(null);
  const [commentClient, setCommentClient] = useState<Client | null>(null);
  const articleSubcriptions: SubscriptionType[] = [];
  const commentSubcriptions: SubscriptionType[] = [];

  window.addEventListener("beforeunload", () => unSubscribeSubcription());

  useEffect(() => {
    recommendArticle()
      .then((response) => {
        const articles: ArticleResponse[] = response.data;
        setDataState({
          ...dataState,
          articles,
        });

        const token = localStorage.getItem("token");
        if (token) {
          const commentStompClient = new Client({
            brokerURL: `${process.env.WEB_SOCKET_URL}/comment?token=${token}`,
            reconnectDelay: 5000,
          });

          setCommentClient(commentStompClient);

          const articleStompClient = new Client({
            brokerURL: `${process.env.WEB_SOCKET_URL}/article?token=${token}`,
            reconnectDelay: 2000,
          });

          setArticleClient(articleStompClient);

          commentStompClient.onConnect = () => {
            articles.forEach((article) => {
              const focusSubscriptionId = commentStompClient.subscribe(
                "/user/comment-topic/article/check-focus/" + article.articleId,
                (message) => {
                  const countFocusing = Number.parseInt(message.body);
                  article.isFocus = countFocusing > 0;
                  setArticle(article);
                }
              ).id;

              commentSubcriptions.push({
                id: focusSubscriptionId,
                destination: "/user/comment-topic/article/check-focus/",
              });

              const createCommentSubcriptionId = commentStompClient.subscribe(
                "/comment-topic/article/create/" + article.articleId,
                (message) => {
                  const json = JSON.parse(message.body);
                  article.comments = json;
                  setArticle(article);
                }
              ).id;

              commentSubcriptions.push({
                id: createCommentSubcriptionId,
                destination: "/comment-topic/article/create/",
              });

              const emotionCommentSubcriptionId = commentStompClient.subscribe(
                "/comment-topic/emotion/" + article.articleId,
                (message) => {
                  const body = JSON.parse(message.body);
                  const commentId: number = body.commentId;
                  const emotions: EmotionCommentResponse[] = body.data;
                  const previousComments = article.comments;
                  if (previousComments) {
                    const currentComment = previousComments.find(
                      (item) => item.commentId == commentId
                    );
                    if (currentComment) {
                      currentComment.emotions = emotions;
                    }
                  }
                  setArticle(article);
                }
              ).id;

              commentSubcriptions.push({
                id: emotionCommentSubcriptionId,
                destination: "/comment-topic/emotion/",
              });
            });
          };

          articleStompClient.onConnect = () => {
            articles.forEach((article) => {
              const emotionArticleSubcriptionId = articleStompClient.subscribe(
                "/article-topic/emotion/" + article.articleId,
                (message) => {
                  const emotions = JSON.parse(message.body);
                  article.emotions = emotions;
                  setArticle(article);
                }
              ).id;

              articleSubcriptions.push({
                id: emotionArticleSubcriptionId,
                destination: "/article-topic/emotion/" + article.articleId,
              });
            });
          };

          commentStompClient.activate();
          articleStompClient.activate();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setEmotions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      unSubscribeSubcription();
      window.removeEventListener("beforeunload", () =>
        unSubscribeSubcription()
      );
    };
  }, []);

  const unSubscribeSubcription = () => {
    if (commentClient != null && commentClient.connected) {
      commentSubcriptions.forEach((item) => {
        commentClient.unsubscribe(item.id, {
          destination: item.destination,
        });
      });
    }

    if (articleClient != null && articleClient.connected) {
      articleSubcriptions.forEach((item) => {
        articleClient.unsubscribe(item.id, {
          destination: item.destination,
        });
      });
    }

    clientDeactivate();
  };

  const clientDeactivate = () => {
    commentClient?.deactivate();
    articleClient?.deactivate();
  };

  const setArticle = (newArticle: ArticleResponse) => {
    setDataState((prevState) => {
      const index = prevState.articles.findIndex(
        (item) => item.articleId === newArticle.articleId
      );

      if (index >= 0) {
        return {
          ...prevState,
          articles: [
            ...prevState.articles.slice(0, index),
            newArticle,
            ...prevState.articles.slice(index + 1),
          ],
        };
      }

      return prevState;
    });
  };

  const value = {
    newsFeedData: dataState,
    setNewsFeedData: setDataState,
    newsFeedControl: controlState,
    setNewsFeedControl: setControlState,
    newsFeedEmotions: emotions,
    setNewsFeedArticle: setArticle,
    commentClient,
    articleClient,
  };

  if (appState.isLoading || appState.data.user == null) {
    return <Loading />;
  } else {
    return (
      <NewsFeedContext.Provider value={value}>
        {props.children}
      </NewsFeedContext.Provider>
    );
  }
};

export default NewsFeedProvider;
