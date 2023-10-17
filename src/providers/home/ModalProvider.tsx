"use client";

import Loading from "components/limb/loading/Loading";
import * as DetailImage from "components/pages/home/modals/sub-tab/detail-func-tab/detail-image";
import * as DetailVideo from "components/pages/home/modals/sub-tab/detail-func-tab/detail-video/DetailVideo";
import * as AddToPost from "components/pages/home/modals/sub-tab/func-tab/AddToPost";
import * as Checkin from "components/pages/home/modals/sub-tab/func-tab/CheckinLocation";
import * as EditFile from "components/pages/home/modals/sub-tab/func-tab/EditFile";
import * as Emotion from "components/pages/home/modals/sub-tab/func-tab/Emotion";
import * as PostScope from "components/pages/home/modals/sub-tab/func-tab/PostScope";
import * as TagFriend from "components/pages/home/modals/sub-tab/func-tab/TagFriend";
import { TAB_CODE } from "constants/HomeConstant";
import { AppContext } from "providers/AppProvider";
import { createContext, useContext, useState } from "react";
import { AppContextType } from "types/pages/AppType";
import { ControlStateType, DataStateType, ImageModalType, ModalContextType, TabStateType, VideoModalType } from "types/pages/HomeType";

export const ModalContext = createContext<ModalContextType | null>(null);

const defaultControlState = {
  tabIndex: 0,
  isShowModal: false,
  isChooseFile: false,
  navTabDetailIndex: 0,
  isShowEmoji: false,
  isLoading: false
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
  text: '',
  files: [],
  tags: [],
  scope: 'PUBLIC'
}

const ModalProvider = (props: any) => {
  const [controlState, setControlState] = useState<ControlStateType>(defaultControlState);
  const [tabState, setTabState] = useState<TabStateType>(defaultTabState);
  const [dataState, setDataState] = useState<DataStateType>(defaultDataState);

  const { appState } = useContext(AppContext) as AppContextType;

  // useEffect(() => {
  //   console.log(dataState);
  // }, [dataState]);

  const changeTabIndex = (tabIndex: number, fileModal?: (VideoModalType | ImageModalType), navTabDetailIndex?: number) => {
    setControlState((previous) => {
      return {
        ...previous,
        tabIndex,
        navTabDetailIndex: navTabDetailIndex ? navTabDetailIndex : 0
      }
    });
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
      console.log(fileModal);
      if (fileModal != undefined && 'tags' in fileModal) {
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
    } else if (tabIndex == TAB_CODE.EMOTION) {
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
    } else if (tabIndex == TAB_CODE.MAIN_TAB) {
      setTabState({
        ...tabState,
        funcTab: defaultTabState.funcTab,
        detailFuncTab: defaultTabState.detailFuncTab
      })
    } else if (tabIndex == TAB_CODE.CHECKIN) {
      setTabState({
        ...tabState,
        funcTab: {
          title: Checkin.title,
          leftIcon: <Checkin.LeftIconComponent />,
          rightIcon: <Checkin.RightIconComponent />,
          children: <Checkin.ChildrenIconComponent />
        },
        detailFuncTab: defaultTabState.detailFuncTab
      })
    } else if (tabIndex == TAB_CODE.SCOPE) {
      setTabState({
        ...tabState,
        funcTab: {
          title: PostScope.title,
          leftIcon: <PostScope.LeftIconComponent />,
          rightIcon: <PostScope.RightIconComponent />,
          children: <PostScope.ChildrenIconComponent />
        },
        detailFuncTab: defaultTabState.detailFuncTab
      })
    }
  }

  const changeFieldDataFile = (fileModal: VideoModalType | ImageModalType) => {
    const index = dataState.files.findIndex(item => item.id == fileModal.id);
    setDataState({
      ...dataState,
      files: [...dataState.files.slice(0, index), fileModal, ...dataState.files.slice(index + 1)]
    })
  }

  const resetData = () => {
    setTabState(defaultTabState);
    setControlState(defaultControlState);
    setDataState(defaultDataState);
  }

  const value = {
    controlModalState: controlState,
    setControlModalState: setControlState,
    tabModalState: tabState,
    setTabModalState: setTabState,
    dataModalState: dataState,
    setDataModalState: setDataState,
    changeTabIndexModal: changeTabIndex,
    changeFieldDataFileModal: changeFieldDataFile,
    resetDataModal: resetData
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