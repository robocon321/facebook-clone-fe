import { faEarthAmericas, faEllipsis, faSortDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalTemplate from 'components/limb/modal/ModalTemplate';
import { AppContext, AppContextType } from 'providers/AppProvider';
import { HomeContext, HomeContextType } from 'providers/HomeProvider';
import React, { useContext } from 'react';
import DragDropFiles from '../uploadfile/DragDropFiles';
import IconButton from 'components/limb/button/IconButton';

const MainTab: React.FC = () => {
    const { setModal, changeTabIndexModal, homeState } = useContext(HomeContext) as HomeContextType;
    const { appState } = useContext(AppContext) as AppContextType;
    const LeftIconComponent: React.FC = () => {
        return (
            <div className='rounded-50 w-12 h-12'>
            </div>
        )
    }

    const RightIconComponent: React.FC = () => {
        return (
            <IconButton click={() => setModal('isShowModal', false)} icon={faXmark} />
        )
    }

    return (
        <ModalTemplate title='Create new post' leftIcon={<LeftIconComponent />} rightIcon={<RightIconComponent />} >
            <div className={"px-4" + (homeState.modal.tabIndexModal == 0 ? " h-auto" : " h-0")}>
                <div className='flex items-center'>
                    <div className='rounded-full w-10 h-10 mr-2 overflow-hidden'>
                        <img src="https://random.imagecdn.app/200/200" />
                    </div>
                    <div>
                        <h4 className='font-bold'>{appState.data.user?.lastName + " " + appState.data.user?.firstName}</h4>
                        <div className='text-sm bg-gray-300 flex items-center justify-center py-1 px-2 rounded-lg'>
                            <span><FontAwesomeIcon icon={faEarthAmericas} /></span>
                            <span className='mx-3'>Public</span>
                            <span><FontAwesomeIcon icon={faSortDown} /></span>
                        </div>
                    </div>
                </div>
                <div className='py-4'>
                    <textarea rows={5} className='max-h-20 overflow-hidden w-full outline-0 text-xl resize-none' placeholder="Hi you, what's on your mind?"></textarea>
                    {
                        homeState.modal.isChooseFile && <DragDropFiles />
                    }                    
                    <div className='py-4 flex justify-between items-center'>
                        <div className='w-10 h-10 cursor-pointer'>
                            <img className='w-full h-full' src="/choose-bg.png" alt="Not found" />
                        </div>
                        <div className='w-8 h-8 cursor-pointer'>
                            <img className='w-full h-full' src="/emoji.png" alt="Not found" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center py-4 border-[0.5px] rounded border-gray-400">
                    <div onClick={() => changeTabIndexModal(1)} className="px-2 cursor-pointer">Thêm vào bài viết của bạn</div>
                    <div onClick={() => setModal("isChooseFile", true)} className={"px-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300  rounded-full w-10 h-10 flex justify-center items-center" + (homeState.modal.isChooseFile ? " bg-gray-200" : " ")}>
                        <img src="/image.png" alt="Not found" />
                    </div>
                    <div className="px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center">
                        <img src="/tag.png" alt="Not found" />
                    </div>
                    <div className="px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center">
                        <img src="/emoji-yellow.png" alt="Not found" />
                    </div>
                    <div className="px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center">
                        <img src="/locate.png" alt="Not found" />
                    </div>
                    <div className="px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center">
                        <img src="/gif.png" alt="Not found" />
                    </div>
                    <div className="px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>
        </ModalTemplate>
    );
};

export default MainTab;
