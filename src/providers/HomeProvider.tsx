"use client";

import { createContext, useState, useContext, useEffect } from "react";
import * as HomeService from "services/AuthService";
import { useRouter } from 'next/navigation'
import { AppContext, AppContextType } from "./AppProvider";
import Loading from "components/limb/loading/loading";

type HomeStateType = {
}

export type HomeContextType = {
};

export const HomeContext = createContext<HomeContextType | null>(null);

const homeStateType: HomeStateType = {
  isLoading: false,
  message: null,
  error: null
}

const HomeProvider = (props: any) => {
  const router = useRouter()

  const { loadUser, appState } = useContext(AppContext) as AppContextType;


  const value = {}

if (appState.isLoading) {
    return <Loading />
  } else {
    return (
      <HomeContext.Provider value={value}>{props.children}</HomeContext.Provider>
    )
  }
}

export default HomeProvider;