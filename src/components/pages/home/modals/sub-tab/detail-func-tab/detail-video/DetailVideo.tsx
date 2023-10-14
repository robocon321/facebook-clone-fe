import { faArrowLeft, faClosedCaptioning, faImages } from '@fortawesome/free-solid-svg-icons';
import IconButton from 'components/limb/buttons/IconButton';
import RoundedIcon from 'components/limb/icon/RoundedIcon';
import { TAB_CODE } from 'constants/HomeConstant';
import { ModalContext } from 'providers/home/ModalProvider';
import React, { useContext } from 'react';
import { ModalContextType, VideoModalType } from 'types/pages/HomeType';
import { convertToBlobFile } from 'utils/FileUtils';

export const LeftIconComponent: React.FC = () => {
    const { changeTabIndexModal } = useContext(ModalContext) as ModalContextType;

    return (
        <IconButton click={
            () => changeTabIndexModal(TAB_CODE.EDIT_FILE)
        } icon={faArrowLeft} />
    )
};

export const RightIconComponent: React.FC = () => {
    return (
        <div className="w-12 h-12"></div>
    )
};

type ChildrenPropsType = {
    fileModal: VideoModalType
}

export const ChildrenIconComponent: React.FC<ChildrenPropsType> = (props) => {
    const { fileModal } = props;
    const { blobUrl, type } = convertToBlobFile(fileModal.file);
    return (
        <div className="flex">
            <div className="w-[20%]">
                <NavVideoComponent fileModal={fileModal} />
            </div>
            <div className="w-[80%]">
                <EditVideoComponent url={blobUrl} />
            </div>
        </div>
    )
};

type NavPropsType = {
    fileModal: VideoModalType
}

const NavVideoComponent: React.FC<NavPropsType> = (props) => {
    const { changeFieldDataFieldModal } = useContext(ModalContext) as ModalContextType;
    const { fileModal } = props;
    return (
        <div className="p-4">
            <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                fileModal.note = e.target.value;
                changeFieldDataFieldModal(fileModal);
            }} 
            value={fileModal.note}
            className="w-full p-2 outline-none resize-none border border-gray-300 hover:border-blue-300" rows={3} placeholder="Subtitle"></textarea>
            <ul className="mt-2">
                <li className="flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer mb-2">
                    <span className="mr-4"><RoundedIcon icon={faImages} /></span><span>Change Thumbnail</span>
                </li>
                <li className="flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer mt-2">
                    <span className="mr-4"><RoundedIcon icon={faClosedCaptioning} /></span><span>Add note</span>
                </li>
            </ul>
        </div>
    )
}

type EditVideoType = {
    url: string
}

const EditVideoComponent: React.FC<EditVideoType> = (props) => {
    const { url } = props;
    return (
        <div className="p-4 bg-gray-800 w-full h-full flex justify-center items-center">
            <div>
                <video className="max-w-full" controls>
                    <source src={`${url}`} type={"video/mp4"} />
                </video>
            </div>
        </div>
    )

}

export const title = "Detail image";