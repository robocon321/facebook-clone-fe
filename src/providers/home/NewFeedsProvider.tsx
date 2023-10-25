"use client";

import Loading from "components/limb/loading/Loading";
import { AppContext } from "providers/AppProvider";
import { createContext, useContext, useEffect, useState } from "react";
import { recommendPost } from "services/PostService";
import { AppContextType } from "types/pages/AppType";
import { ControlStateType, DataStateType, EmotionType, NewsFeedContextType } from "types/pages/home/NewsFeedType";
import { PostResponse } from "types/responses/PostResponse";

export const NewsFeedContext = createContext<NewsFeedContextType | null>(null);

const defaultControlState: ControlStateType = {
  page: 0
}

const defaultDataState: DataStateType = {
  posts: []
}

const NewsFeedProvider = (props: any) => {
  const { appState } = useContext(AppContext) as AppContextType;
  const [dataState, setDataState] = useState<DataStateType>(defaultDataState);
  const [controlState, setControlState] = useState<ControlStateType>(defaultControlState);
  const [emotions, setEmotions] = useState<EmotionType[]>([]);

  useEffect(() => {
    recommendPost().then(response => {
      setDataState({
        ...dataState,
        posts: response.data
      });
    }).catch((error) => {
      console.log(error);
    })

    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setEmotions(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const setPost = (newPost: PostResponse) => {
    const index = dataState.posts.findIndex(item => item.postId == newPost.postId);
    if(index >= 0) {
      setDataState({
        ...dataState,
        posts: [...dataState.posts.slice(0, index), newPost, ...dataState.posts.slice(index + 1)]
      })
    }
  }

  const value = {
    newsFeedData: dataState,
    setNewsFeedData: setDataState,
    newsFeedControl: controlState,
    setNewsFeedControl: setControlState,
    newsFeedEmotions: emotions,
    setNewsFeedPost: setPost
  }

  if (appState.isLoading || appState.data.user == null) {
    return <Loading />
  } else {
    return (
      <NewsFeedContext.Provider value={value}>{props.children}</NewsFeedContext.Provider>
    )
  }
}

export default NewsFeedProvider;