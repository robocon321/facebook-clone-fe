"use client"

import { faCropSimple, faFont, faRotate, faSpellCheck, faTag, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoundedIcon from "components/limb/icon/RoundedIcon";
import { TAB_IMAGE_NAV_CODE } from "constants/HomeConstant";
import { ModalContext } from "providers/home/ModalProvider";
import { useContext } from "react";
import { ImageModalType, ModalContextType } from "types/pages/HomeType";

type NavPropsType = {
    fileModal: ImageModalType
}

const colors = ['#c45f00', '#6900c4', '#e5eb34', '#eb4034', '#9634eb', '#4ceb34', '#34c9eb', '#9feb34', '#3474eb', '#e234eb', '#34ebb4', '#eb3480']

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

    const changeColorSelectedText = (color: string) => {
        fileModal.texts = fileModal.texts?.map(item => {
            if (item.id == fileModal.selectedText) {
                item.color = color;
            }
            return item;
        });
        changeFieldDataFieldModal(fileModal);
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
                            <div className="text-gray-500">Tagged in image</div>
                            {
                                fileModal.tags?.filter(item => item.account != null).map(item => (
                                    <div key={item.id} className="flex justify-between items-center m-2 bg-blue-100 text-blue-600 min-w-[150px] rounded p-2">
                                        <div>{item.account.firstName + " " + item.account.lastName}</div>
                                        <div className="hover:bg-gray-200 rounded-full w-[25px] h-[25px] flex justify-center items-center cursor-pointer"
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
                {
                    navTabDetailIndex == TAB_IMAGE_NAV_CODE.TEXT && (
                        <li className="flex flex-wrap border border-gray-200 p-2 max-h-[300px] text-sm">
                            <div className="text-gray-500">Change color insert text</div>
                            <ul className="flex flex-wrap justify-between items-center">
                                {
                                    colors.map(item => {
                                        return (
                                            <li key={item} onClick={() => changeColorSelectedText(item)} className="w-[30px] h-[30px] rounded-full m-1" style={{backgroundColor: item}}></li>
                                        )
                                    })
                                }
                            </ul>
                        </li>

                    )
                }

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

export default NavImageComponent;