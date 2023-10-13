"use client";

import Loading from "components/limb/loading/Loading";
import * as AddToPost from "components/pages/home/modals/AddToPost";
import * as DetailImage from "components/pages/home/modals/detail-image";
import * as DetailVideo from "components/pages/home/modals/DetailVideo";
import * as EditFile from "components/pages/home/modals/EditFile";
import * as TagFriend from "components/pages/home/modals/TagFriend";
import * as Emotion from "components/pages/home/modals/Emotion";
import { TAB_CODE } from "constants/HomeConstant";
import { createContext, useContext, useEffect, useState } from "react";
import { ControlStateType, DataStateType, ImageModalType, ModalContextType, TabStateType, TagImageType, VideoModalType } from "types/pages/HomeType";
import { AppContext, AppContextType } from "../AppProvider";

export const ModalContext = createContext<ModalContextType | null>(null);

const defaultControlState = {
  tabIndex: 0,
  isShow: false,
  isChooseFile: false,
  navTabDetailIndex: 0,
}

const defaultTabState = {
  funcTab: {
    title: 'Nothing here',
    leftIcon: <div></div>,
    rightIcon: <div></div>,
    children: null
  },
  detailFuncTab: {
    title: 'Nothing here',
    leftIcon: <div></div>,
    rightIcon: <div></div>,
    children: null
  }
}

const defaultDataState = {
  files: [],
  tags: []
}

const ModalProvider = (props: any) => {
  const [controlState, setControlState] = useState<ControlStateType>(defaultControlState);
  const [tabState, setTabState] = useState<TabStateType>(defaultTabState);
  const [dataState, setDataState] = useState<DataStateType>(defaultDataState);

  const { appState } = useContext(AppContext) as AppContextType;

  useEffect(() => {
    console.log(dataState);
  }, [dataState]);

  const changeTabIndex = (tabIndex: number, fileModal?: VideoModalType | ImageModalType, navTabDetailIndex?: number) => {
    setControlState({
      ...controlState,
      tabIndex,
      navTabDetailIndex: navTabDetailIndex ? navTabDetailIndex : 0
    })
    if (tabIndex == TAB_CODE.ADD_TO_POST) {
      setTabState({
        ...tabState,
        funcTab: {
          title: AddToPost.title,
          leftIcon: <AddToPost.LeftIconComponent />,
          rightIcon: <AddToPost.RightIconComponent />,
          children: <AddToPost.ChildrenIconComponent />
        },
        detailFuncTab: defaultTabState.detailFuncTab
      })
    } else if (tabIndex == TAB_CODE.EDIT_FILE) {
      setTabState({
        ...tabState,
        funcTab: {
          title: EditFile.title,
          leftIcon: <EditFile.LeftIconComponent />,
          rightIcon: <EditFile.RightIconComponent />,
          children: <EditFile.ChildrenIconComponent />
        },
        detailFuncTab: defaultTabState.detailFuncTab
      })
    } else if (tabIndex == TAB_CODE.DETAIL_IMAGE) {
      if (fileModal != undefined) {
        setTabState({
          ...tabState,
          funcTab: defaultTabState.funcTab,
          detailFuncTab: {
            title: DetailImage.title,
            leftIcon: <DetailImage.LeftIconComponent />,
            rightIcon: <DetailImage.RightIconComponent />,
            children: <DetailImage.ChildrenIconComponent fileModal={fileModal} />
          }
        });
      }
    } else if (tabIndex == TAB_CODE.DETAIL_VIDEO) {
      if (fileModal != undefined) {
        setTabState({
          ...tabState,
          funcTab: defaultTabState.funcTab,
          detailFuncTab: {
            title: DetailVideo.title,
            leftIcon: <DetailVideo.LeftIconComponent />,
            rightIcon: <DetailVideo.RightIconComponent />,
            children: <DetailVideo.ChildrenIconComponent fileModal={fileModal} />
          }
        });
      }
    } else if (tabIndex == TAB_CODE.TAG_FRIEND) {
      setTabState({
        ...tabState,
        funcTab: {
          title: TagFriend.title,
          leftIcon: <TagFriend.LeftIconComponent />,
          rightIcon: <TagFriend.RightIconComponent />,
          children: <TagFriend.ChildrenIconComponent />
        },
        detailFuncTab: defaultTabState.detailFuncTab
      })
    } else if(tabIndex == TAB_CODE.EMOTION) {
      setTabState({
        ...tabState,
        funcTab: {
          title: Emotion.title,
          leftIcon: <Emotion.LeftIconComponent />,
          rightIcon: <Emotion.RightIconComponent />,
          children: <Emotion.ChildrenIconComponent />
        },
        detailFuncTab: defaultTabState.detailFuncTab
      })
    } else if(tabIndex == TAB_CODE.MAIN_TAB) {
      setTabState({
        ...tabState,
        funcTab: defaultTabState.funcTab,
        detailFuncTab: defaultTabState.detailFuncTab
      })
    }
  }

  const changeFieldDataField = (fileModal: VideoModalType | ImageModalType) => {
    const index = dataState.files.findIndex(item => item.id == fileModal.id);
    setDataState({
      ...dataState,
      files: [...dataState.files.slice(0, index), fileModal, ...dataState.files.slice(index + 1)]
    })
  }

  const value = {
    controlModalState: controlState,
    setControlModalState: setControlState,
    tabModalState: tabState,
    setTabModalState: setTabState,
    dataModalState: dataState,
    setDataModalState: setDataState,
    changeTabIndexModal: changeTabIndex,
    changeFieldDataFieldModal: changeFieldDataField
  }

  if (appState.isLoading || appState.data.user == null) {
    return <Loading />
  } else {
    return (
      <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>
    )
  }
}

export default ModalProvider;