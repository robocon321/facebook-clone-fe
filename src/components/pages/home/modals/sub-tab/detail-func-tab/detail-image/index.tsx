"use client"

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import IconButton from 'components/limb/buttons/IconButton';
import { TAB_CODE } from 'constants/HomeConstant';
import { ModalContext } from 'providers/home/ModalProvider';
import React, { useContext } from 'react';
import { ImageModalType, ModalContextType } from 'types/pages/HomeType';
import EditImageComponent from './EditImage';
import NavImageComponent from './NavImageComponent';

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

export const title = "Detail image";