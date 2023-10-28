"use client"

import MainTab from 'app/(main)/home/_components/modals/main-tab';
import SubTab from 'app/(main)/home/_components/modals/sub-tab';
import Modal from 'components/limb/modal/Modal';
import { TAB_CODE_GROUP } from 'app/(main)/home/_constant/HomeConstant';
import { ModalContext } from 'app/(main)/home/_providers/ModalProvider';
import NewsFeedProvider from 'app/(main)/home/_providers/NewFeedsProvider';
import React, { useContext } from 'react';
import { ModalContextType } from 'app/(main)/home/_type/ModalType';
import LeftSidebar from './_components/layouts/LeftSidebar';
import RightSidebar from './_components/layouts/RightSidebar';
import NewsFeed from './_components/layouts/NewsFeed';

const HomePage: React.FC = () => {
  const { controlModalState, tabModalState, setControlModalState } = useContext(ModalContext) as ModalContextType;
  return (
    <div className="w-full h-full grid grid-cols-7">
      <div className="col-span-3 flex justify-start ml-2">
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
          <NewsFeed />
        </NewsFeedProvider>
      </div>
      <div className="col-span-3 flex justify-end pr-2">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
