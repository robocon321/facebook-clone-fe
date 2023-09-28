"use client"

import React, { useContext } from 'react';
import LeftSidebar from 'components/pages/home/layout/LeftSidebar';
import NewsFeedScreen from 'components/pages/home/layout/NewsFeed';
import RightSidebar from 'components/pages/home/layout/RightSidebar';
import Modal from 'components/limb/modal/Modal';
import MainTab from 'components/pages/home/modal/MainTab';
import SubTab from 'components/pages/home/modal/SubTab';
import { HomeContext, HomeContextType } from 'providers/HomeProvider';

const HomePage: React.FC = () => {
  const { homeState } = useContext(HomeContext) as HomeContextType;
  return (
    <div className="w-full h-full grid grid-cols-7">
      <div className="col-span-2 flex justify-start ml-2">
        <LeftSidebar />
      </div>
      <div className="col-span-3 h-full">        
        <Modal isShow={homeState.modal.isShowModal}>       
          <div className={"flex relative transition-[right] duration-200" + (homeState.modal.tabIndexModal == 0 ? ' right-0' : ' right-full')}>
            <MainTab />
            <SubTab {...homeState.modal.subTab} />
          </div>
        </Modal>
        <NewsFeedScreen />
      </div>
      <div className="col-span-2 flex justify-end pr-2">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
