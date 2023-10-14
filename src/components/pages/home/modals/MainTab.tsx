import { faEarthAmericas, faEllipsis, faSortDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalTemplate from 'components/limb/modal/ModalTemplate';
import { AppContext, AppContextType } from 'providers/AppProvider';
import React, { useContext, useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import DragDropFiles from '../uploadfile/DragDropFiles';
import IconButton from 'components/limb/buttons/IconButton';
import { TAB_CODE } from 'constants/HomeConstant';
import { ModalContextType } from 'types/pages/HomeType';
import { ModalContext } from 'providers/home/ModalProvider';

const LeftIconComponent: React.FC = () => {
    return (
        <div className='rounded-50 w-12 h-12'>
        </div>
    )
}

const RightIconComponent: React.FC = () => {
    const { controlModalState, setControlModalState } = useContext(ModalContext) as ModalContextType;
    return (
        <IconButton click={() => setControlModalState({
            ...controlModalState,
            isShowModal: false,
            isShowEmoji: false
        })} icon={faXmark} />
    )
}

const MainTab: React.FC = () => {
    const { dataModalState, setDataModalState, controlModalState, setControlModalState, changeTabIndexModal } = useContext(ModalContext) as ModalContextType;
    const { appState } = useContext(AppContext) as AppContextType;

    const onChooseEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
        setDataModalState((preview) => {
            return {
                ...dataModalState,
                text: preview.text + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
            }
        })
    }

    const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDataModalState({
            ...dataModalState,
            text: e.currentTarget ? e.currentTarget.value : ""
        })
    }

    return (
        <ModalTemplate title='Create new post' leftIcon={<LeftIconComponent />} rightIcon={<RightIconComponent />} >
            <div className={"px-4" + (controlModalState.tabIndex == TAB_CODE.MAIN_TAB ? " h-auto" : " h-0")}>
                <div className='flex items-center'>
                    <div className='rounded-full min-w-[50px] min-h-[50px] w-[50px] h-[50px] mr-2 overflow-hidden'>
                        <img src="https://random.imagecdn.app/200/200" />
                    </div>
                    <div>
                        <ul className="flex flex-wrap">
                            <li><a className="hover:underline" href="#"><b>
                                {appState.data.user?.lastName + " " + appState.data.user?.firstName}
                            </b></a></li>
                            {dataModalState.emotion && (
                                <div className="flex">
                                    <span className="mx-1">is feeling</span>
                                    <span className="mx-1">{dataModalState.emotion.text}</span>
                                    <img className="mx-1 w-[25px] h-[25px]" src={dataModalState.emotion.imageUrl} alt="Not found" />
                                </div>
                            )}
                            {
                                dataModalState.checkin && (
                                    <div className="flex">
                                        <span className="mx-1">is living</span>
                                        <span className="mx-1 hover:underline"><a href="#"><b>{dataModalState.checkin.address + ", " + dataModalState.checkin.city + ", " + dataModalState.checkin.country}</b></a></span>
                                    </div>
                                )
                            }
                            {dataModalState.tags.length > 0 && <span className='mx-1'>with</span>}
                            {
                                dataModalState.tags.slice(0, 3).map((item, index) => {
                                    return (
                                        <li key={item.accountId}><a className="hover:underline" href="#"><b>
                                            {item.lastName + " " + item.firstName + (index < 2 ? ", " : " ")}
                                        </b></a></li>
                                    )
                                })
                            }
                            {dataModalState.tags.length > 3 && <li><span className='mx-1'>and</span><a className="hover:underline" href="#"><b> {dataModalState.tags.length - 3} other people</b></a></li>}
                        </ul>
                        <div className='text-sm bg-gray-300 flex items-center justify-center py-1 px-2 rounded-lg max-w-[150px]'>
                            <span><FontAwesomeIcon icon={faEarthAmericas} /></span>
                            <span className='mx-3'>Public</span>
                            <span><FontAwesomeIcon icon={faSortDown} /></span>
                        </div>
                    </div>
                </div>
                <div className='py-4'>
                    <textarea value={dataModalState.text} onChange={onChangeText} rows={5} className='max-h-20 w-full outline-0 text-xl resize-none' placeholder="Hi you, what's on your mind?"></textarea>
                    {
                        (dataModalState.files.length > 0 || controlModalState.isChooseFile) && <DragDropFiles />
                    }
                    <div className='py-4 flex justify-between items-center'>
                        <div className='w-10 h-10 cursor-pointer'>
                            <img className='w-full h-full' src="/choose-bg.png" alt="Not found" />
                        </div>
                        <div className='relative w-8 h-8 cursor-pointer'>
                            {controlModalState.isShowEmoji && <div className='fixed'>
                                <EmojiPicker
                                    onEmojiClick={onChooseEmoji}
                                    height={400}
                                    previewConfig={{
                                        showPreview: false
                                    }} />
                            </div>}
                            <img onClick={() => {
                                setControlModalState({
                                    ...controlModalState,
                                    isShowEmoji: true
                                })
                            }} className='w-full h-full' src="/emoji.png" alt="Not found" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center py-4 border-[0.5px] rounded border-gray-400">
                    <div onClick={() => changeTabIndexModal(TAB_CODE.ADD_TO_POST)} className="px-2 cursor-pointer">Thêm vào bài viết của bạn</div>
                    <div onClick={() => setControlModalState({
                        ...controlModalState,
                        isChooseFile: true
                    })} className={"px-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300  rounded-full w-10 h-10 flex justify-center items-center" + (dataModalState.files.length > 0 ? " bg-gray-200" : " ")}>
                        <img src="/image.png" alt="Not found" />
                    </div>
                    <div onClick={() => changeTabIndexModal(TAB_CODE.TAG_FRIEND)} className={"px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center" + (dataModalState.tags.length > 0 ? " bg-gray-200" : " ")}>
                        <img src="/tag.png" alt="Not found" />
                    </div>
                    <div onClick={() => changeTabIndexModal(TAB_CODE.EMOTION)} className={"px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center" + (dataModalState.emotion ? " bg-gray-200" : " ")}>
                        <img src="/emoji-yellow.png" alt="Not found" />
                    </div>
                    <div onClick={() => changeTabIndexModal(TAB_CODE.CHECKIN)} className={"px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center" + (dataModalState.checkin ? " bg-gray-200" : " ")}>
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
