"use client"

import Modal from 'components/limb/modal/Modal';
import LeftSidebar from 'components/pages/home/layouts/LeftSidebar';
import NewsFeedScreen from 'components/pages/home/layouts/NewsFeed';
import RightSidebar from 'components/pages/home/layouts/RightSidebar';
import MainTab from 'components/pages/home/modals/main-tab';
import SubTab from 'components/pages/home/modals/sub-tab';
import { TAB_CODE_GROUP } from 'constants/HomeConstant';
import { ModalContext } from 'providers/home/ModalProvider';
import NewsFeedProvider from 'providers/home/NewFeedsProvider';
import React, { useContext, useEffect } from 'react';
import { ModalContextType } from 'types/pages/home/ModalType';

const HomePage: React.FC = () => {
  const { controlModalState, tabModalState, setControlModalState } = useContext(ModalContext) as ModalContextType;
  return (
    <div className="w-full h-full grid grid-cols-7">
      <div className="col-span-2 flex justify-start ml-2">
        <LeftSidebar />
      </div>
      <div className="col-span-3 h-full">
        <Modal onClickOutside={() => {
          if (controlModalState.isShowEmoji) {
            setControlModalState({
              ...controlModalState,
              isShowEmoji: false
            });
          } else {
            setControlModalState({
              ...controlModalState,
              isShowModal: false
            });
          }
        }} isShow={controlModalState.isShowModal} width={
          controlModalState.tabIndex >= TAB_CODE_GROUP.DETAIL_FUNC_GROUP ?
            'max-w-[1550px]' : controlModalState.tabIndex >= TAB_CODE_GROUP.FUNC_GROUP ?
              'max-w-3xl' : 'max-w-2xl'
        }>
          <div onClick={() => {
                setControlModalState((previous) => {
                    return {
                        ...previous,
                        isShowEmoji: false
                    }
                }
                )
            }} className={"flex relative transition-[right] duration-200" + (
            controlModalState.tabIndex >= TAB_CODE_GROUP.DETAIL_FUNC_GROUP ?
              ' right-[200%]' : controlModalState.tabIndex >= TAB_CODE_GROUP.FUNC_GROUP ?
                ' right-[100%]' : ' right-0')
          }>
            <MainTab />
            <SubTab {...tabModalState.funcTab} />
            <SubTab {...tabModalState.detailFuncTab} />
          </div>
        </Modal>
        <NewsFeedProvider>
          <NewsFeedScreen />
        </NewsFeedProvider>
      </div>
      <div className="col-span-2 flex justify-end pr-2">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
