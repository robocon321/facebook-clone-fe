"use client";

import { createContext, useState, useContext, Dispatch, SetStateAction } from "react";
import { AppContext, AppContextType } from "./AppProvider";
import Loading from "components/limb/loading/Loading";
import { SubTabType } from "components/pages/home/modal/SubTab";
import * as AddToPost from "components/pages/home/modal/AddToPost";

type HomeStateType = {
  modal: {
    tabIndexModal: number,
    isShowModal: boolean,
    subTab: SubTabType,
    isChooseFile: boolean,
    data: {
      images: string[]      
    }
  }
}

export type HomeContextType = {
  homeState: HomeStateType,
  setModal: (key: string, value: any) => void,
  setDataModal: (key: string, value: any) => void,
  changeTabIndexModal: (tabIndex: number) => void,
  setHomeState: Dispatch<SetStateAction<HomeStateType>>,
};

export const HomeContext = createContext<HomeContextType | null>(null);

const defaultHomeState: HomeStateType = {
  modal: {
    tabIndexModal: 0,
    isShowModal: false,
    isChooseFile: false,
    subTab: {
      title: 'Nothing here',
      leftIcon: <div></div>,
      rightIcon: <div></div>,
      children: null  
    },
    data: {
      images: []
    }
  }
}

const HomeProvider = (props: any) => {
  const [homeState, setHomeState] = useState(defaultHomeState);
  const { appState } = useContext(AppContext) as AppContextType;

  const setModal = (key: string, value: any) => {
    console.log(key, value);
    setHomeState({
      ...homeState,
      modal: {
        ...homeState.modal,
        [key]: value
      }
    });
  }

  const setDataModal = (key: string, value: any) => {
    setHomeState({
      ...homeState,
      modal: {
        ...homeState.modal,
        data: {
          ...homeState.modal.data,
          [key]: value
        }
      }
    });
    
  }

  const changeTabIndexModal = (tabIndex: number) => {
    if(tabIndex == 1) {
      setHomeState({
        ...homeState,
        modal: {
          ...homeState.modal,
          tabIndexModal: 1,
          subTab: {
            title: AddToPost.title,
            leftIcon: <AddToPost.LeftIconComponent />,
            rightIcon: <AddToPost.RightIconComponent />,
            children: <AddToPost.ChildrentIconComponent />  
          }
                
        }
      })      
    }
  }

  const value = {
    homeState,
    setModal,
    setDataModal,
    changeTabIndexModal,
    setHomeState
  }

if (appState.isLoading || appState.data.user == null) {
    return <Loading />
  } else {
    return (
      <HomeContext.Provider value={value}>{props.children}</HomeContext.Provider>
    )
  }
}

export default HomeProvider;