import React, { useContext } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/limb/buttons/IconButton';
import { TAB_CODE } from 'constants/HomeConstant';
import { ModalContext } from 'providers/home/ModalProvider';
import { ModalContextType } from 'types/pages/HomeType';

export const LeftIconComponent: React.FC = () => {
    const { changeTabIndexModal } = useContext(ModalContext) as ModalContextType;

    return (
        <IconButton click={
            () => changeTabIndexModal(TAB_CODE.MAIN_TAB)
        } icon={faArrowLeft} />
    )
};

export const RightIconComponent: React.FC = () => {
    return (
        <div className="w-12 h-12"></div>
    )
};

export const ChildrenIconComponent: React.FC = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
                <img className="mr-2" src="/image.png" alt="Not found" />
                <div>Picture/video</div>
            </div>
            <div className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
                <img className="mr-2" src="/tag.png" alt="Not found" />
                <div>Tag other people</div>
            </div>
            <div className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
                <img className="mr-2" src="/emoji-yellow.png" alt="Not found" />
                <div>Motion/Activity</div>
            </div>
            <div className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
                <img className="mr-2" src="/locate.png" alt="Not found" />
                <div>Check in</div>
            </div>
            <div className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
                <img className="mr-2" src="/gif.png" alt="Not found" />
                <div>File GIF</div>
            </div>
            <div className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
                <img className="mr-2" src="/livestream.png" alt="Not found" />
                <div>Livestream</div>
            </div>
            <div className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
                <img className="mr-2" src="/event.png" alt="Not found" />
                <div>Event</div>
            </div>
        </div>
    )
};

export const title = "Add to your post";