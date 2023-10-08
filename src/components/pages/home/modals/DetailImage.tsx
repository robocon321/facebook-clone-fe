import { faArrowLeft, faClose, faCropSimple, faFont, faRotate, faSearch, faSpellCheck, faTag, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/limb/buttons/IconButton';
import RoundedIcon from 'components/limb/icon/RoundedIcon';
import { TAB_CODE, TAB_IMAGE_NAV_CODE } from 'constants/HomeConstant';
import { ModalContext } from 'providers/home/ModalProvider';
import React, { useContext, useRef, useState } from 'react';
import { getAccountFriendshipAndStatus } from 'services/AccountService';
import { ImageModalType, ModalContextType, TagImageType } from 'types/pages/HomeType';
import { AccountSummaryInfoResponse } from 'types/responses/AccountSummaryInfoResponseType';
import { convertToBlobFile } from 'utils/FileUtils';
import { generateRandomString } from 'utils/RandomUtils';

export const LeftIconComponent: React.FC = () => {
    const { changeTabIndexModal } = useContext(ModalContext) as ModalContextType;

    return (
        <IconButton click={
            () => changeTabIndexModal(
                TAB_CODE.EDIT_FILE
            )} icon={faArrowLeft} />
    )
};

export const RightIconComponent: React.FC = () => {
    return (
        <div className="w-12 h-12"></div>
    )
};

type ChildrenPropsType = {
    fileModal: ImageModalType
}

export const ChildrenIconComponent: React.FC<ChildrenPropsType> = (props) => {
    const { fileModal } = props;
    return (
        <div className="flex">
            <div className="w-[20%]">
                <NavImageComponent fileModal={fileModal} />
            </div>
            <div className="w-[80%]">
                <EditImageComponent fileModal={fileModal} />
            </div>
        </div>
    )
};

type NavPropsType = {
    fileModal: ImageModalType
}

const NavImageComponent: React.FC<NavPropsType> = (props) => {
    const { changeFieldDataFieldModal, setControlModalState, controlModalState } = useContext(ModalContext) as ModalContextType;
    const { navTabDetailIndex } = controlModalState;
    const { fileModal } = props;
    const onRemoveFriendTag = (accountId: number) => {
        if (fileModal.tags) {
            fileModal.tags = fileModal.tags.filter(item => item.account != null && item.account.accountId != accountId);
            changeFieldDataFieldModal(fileModal);
        }
    }

    const isTagNonEmpty = (): boolean => {
        return fileModal.tags != undefined && fileModal.tags.filter(item => item.account != null).length != 0;
    }

    return (
        <div className="p-4">
            <textarea
                onClick={() => setControlModalState({
                    ...controlModalState,
                    navTabDetailIndex: TAB_IMAGE_NAV_CODE.TEXTAREA
                })}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    fileModal.note = e.target.value;
                    changeFieldDataFieldModal(fileModal);
                }}
                value={fileModal.note}
                className="w-full p-2 outline-none resize-none border border-gray-300 hover:border-blue-300" rows={3} placeholder="Subtitle">
            </textarea>
            <ul className="mt-2">
                <li
                    onClick={() => setControlModalState({
                        ...controlModalState,
                        navTabDetailIndex: TAB_IMAGE_NAV_CODE.CROP
                    })}
                    className={"flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer mb-2" +
                        (navTabDetailIndex == TAB_IMAGE_NAV_CODE.CROP ? " bg-blue-100" : "")}>
                    <span className="mr-4"><RoundedIcon icon={faCropSimple} /></span><span>Crop</span>
                </li>
                <li
                    onClick={() => setControlModalState({
                        ...controlModalState,
                        navTabDetailIndex: TAB_IMAGE_NAV_CODE.ROTATE
                    })}
                    className={"flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer my-2" +
                        (navTabDetailIndex == TAB_IMAGE_NAV_CODE.ROTATE ? " bg-blue-100" : "")}>
                    <span className="mr-4"><RoundedIcon icon={faRotate} /></span><span>Rotate</span>
                </li>
                <li
                    onClick={() => setControlModalState({
                        ...controlModalState,
                        navTabDetailIndex: TAB_IMAGE_NAV_CODE.TAG
                    })}
                    className={"flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer my-2" +
                        (navTabDetailIndex == TAB_IMAGE_NAV_CODE.TAG ? " bg-blue-100" : "")}>
                    <span className="mr-4"><RoundedIcon icon={faTag} /></span><span>Tag</span>
                </li>
                {
                    isTagNonEmpty() && (
                        <li className="flex flex-wrap border border-gray-200 p-2 max-h-[300px] text-sm">
                            <div className="text-blue-500">Tagged in image</div>
                            {
                                fileModal.tags?.filter(item => item.account != null).map(item => (
                                    <div className="flex justify-between items-center m-2 bg-blue-100 text-blue-600 min-w-[150px] rounded p-2">
                                        <div>{item.account.firstName + " " + item.account.lastName}</div>
                                        <div key={item.id} className="hover:bg-gray-200 rounded-full w-[25px] h-[25px] flex justify-center items-center cursor-pointer"
                                            onClick={() => onRemoveFriendTag(item.account.accountId)}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </div>
                                    </div>
                                ))
                            }
                        </li>

                    )
                }
                <li
                    onClick={() => setControlModalState({
                        ...controlModalState,
                        navTabDetailIndex: TAB_IMAGE_NAV_CODE.TEXT
                    })}
                    className={"flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer my-2" +
                        (navTabDetailIndex == TAB_IMAGE_NAV_CODE.TEXT ? " bg-blue-100" : "")}>
                    <span className="mr-4"><RoundedIcon icon={faFont} /></span><span>Insert text</span>
                </li>
                <li
                    onClick={() => setControlModalState({
                        ...controlModalState,
                        navTabDetailIndex: TAB_IMAGE_NAV_CODE.REPLACE
                    })}
                    className={"flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer mt-2" +
                        (navTabDetailIndex == TAB_IMAGE_NAV_CODE.REPLACE ? " bg-blue-100" : "")}>
                    <span className="mr-4"><RoundedIcon icon={faSpellCheck} /></span><span>Replace text</span>
                </li>
            </ul>
        </div>
    )
}

type EditImageType = {
    fileModal: ImageModalType
}

const EditImageComponent: React.FC<EditImageType> = (props) => {
    const { controlModalState, changeFieldDataFieldModal } = useContext(ModalContext) as ModalContextType;
    const { fileModal } = props;
    const { blobUrl } = convertToBlobFile(fileModal.file);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const { navTabDetailIndex } = controlModalState;

    const [searchFriends, setSearchFriends] = useState<AccountSummaryInfoResponse[]>();


    const handleClick = (event: React.MouseEvent) => {
        setSearchFriends([]);
        if (imageRef.current) {
            const image = imageRef.current;
            const imageLeft = image.getBoundingClientRect().left;
            const imageTop = image.getBoundingClientRect().top;
            const imageWidth = image.getBoundingClientRect().width;
            const imageHeight = image.getBoundingClientRect().height;

            const x = event.clientX - imageLeft;
            const y = event.clientY - imageTop;

            const percentX = x * 100 / imageWidth;
            const percentY = y * 100 / imageHeight;

            const newTag: TagImageType = {
                id: generateRandomString(10),
                account: null,
                x_pos: percentX,
                y_pos: percentY
            }

            fileModal.tags = fileModal.tags?.filter(item => item.account != null);
            fileModal.tags = fileModal.tags ? [...fileModal.tags, newTag] : [newTag];
            changeFieldDataFieldModal(fileModal);
        }
    };

    const onTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const content = event.currentTarget.value;
        if (fileModal.tags) {
            const excludeIds = fileModal.tags?.filter(item => item.account != null).map(item => item.account.accountId);
            getAccountFriendshipAndStatus('ACCEPTED', content, excludeIds)
                .then(data => {
                    setSearchFriends(data.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const onAddFriendTag = (account: AccountSummaryInfoResponse) => {
        if (fileModal.tags) {
            const lastTag = fileModal.tags[fileModal.tags.length - 1];
            lastTag.account = account;
            fileModal.tags[fileModal.tags.length - 1] = lastTag;
            changeFieldDataFieldModal(fileModal);
        }
    }

    const onRemoveFriendTag = (accountId: number) => {
        if (fileModal.tags) {
            fileModal.tags = fileModal.tags.filter(item => item.account != null && item.account.accountId != accountId);
            changeFieldDataFieldModal(fileModal);
        }
    }

    return (
        <div className={"relative p-8 bg-gray-800 w-full h-full flex justify-center items-center"
            + (navTabDetailIndex == TAB_IMAGE_NAV_CODE.TAG ? " cursor-pointer" : " ")}>
                {navTabDetailIndex == TAB_IMAGE_NAV_CODE.TAG && <div className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 text-white">Click any position on image to tag your friends</div>}
            <div className="relative">
                <img
                    ref={imageRef}
                    onClick={handleClick}
                    className="max-w-full" src={blobUrl} alt="Not found" />
                {
                    navTabDetailIndex == TAB_IMAGE_NAV_CODE.TAG && fileModal.tags?.map(item => {
                        let imageHeight = 0;
                        let imageWidth = 0;
                        if (imageRef.current) {
                            const image = imageRef.current;
                            imageWidth = image.getBoundingClientRect().width;
                            imageHeight = image.getBoundingClientRect().height;
                        }
                        if (item.account) {
                            const top = `${item.y_pos * imageHeight / 100}px`;
                            const left = `${item.x_pos * imageWidth / 100 - 50}px`;
                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        top,
                                        left
                                    }}
                                    className={"absolute flex flex-col items-center"}>
                                    <div className="flex justify-centers">
                                        <svg height="12" viewBox="0 0 25 12" width="25" fill="#ffffff" style={{
                                            transform: "scale(1, -1)",
                                            translate: "0px 0px"
                                        }}><path d="M24.553.103c-2.791.32-5.922 1.53-7.78 3.455l-9.62 7.023c-2.45 2.54-5.78 1.645-5.78-2.487V2.085C1.373 1.191.846.422.1.102h24.453z"></path></svg>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-2 min-w-[200px] rounded">
                                        <span>{`${item.account.firstName} ${item.account.lastName}`}</span>
                                        <span className="hover:bg-gray-200 rounded-full w-[25px] h-[25px] flex justify-center items-center" onClick={() => onRemoveFriendTag(item.account.accountId)}><FontAwesomeIcon icon={faXmark} /></span>
                                    </div>
                                </div>
                            )
                        } else {
                            const top = `${item.y_pos * imageHeight / 100 - 50}px`;
                            const left = `${item.x_pos * imageWidth / 100 - 120}px`;
                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        top,
                                        left
                                    }}
                                    className={"absolute flex flex-col items-center"}>
                                    <div style={{
                                        backgroundColor: "rgba(222, 222, 222, 0.3)",
                                        boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 1)"
                                    }} className="mb-2 border border-white w-[100px] h-[100px] rounded"></div>
                                    <div className="p-2 bg-white">
                                        <div className="flex items-center p-2 border border-gray-200 bg-white rounded">
                                            <span className="mr-2"><FontAwesomeIcon icon={faSearch} /></span>
                                            <input type="text" className="outline-none" placeholder="Friend's name" onChange={onTextInputChange} />
                                        </div>
                                        <ul className="w-full bg-white mt-1">
                                            {
                                                searchFriends?.map(item => (
                                                    <li key={item.accountId} onClick={() => onAddFriendTag(item)} className="flex items-center p-2 hover:bg-gray-200 rounded">
                                                        <span className="mr-2 w-[20px] h-[20px]"><img className="w-full h-full rounded-full" src="https://random.imagecdn.app/500/400" alt="Not found" /></span>
                                                        <span>{item.firstName + " " + item.lastName}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>

                                    </div>
                                </div>
                            )

                        }
                    })
                }
            </div>
        </div>
    )
}

export const title = "Detail image";