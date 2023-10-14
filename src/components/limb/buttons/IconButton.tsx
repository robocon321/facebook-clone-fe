import React from 'react';
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconButtonType = {
    icon: IconDefinition,
    click?: (event: any) => void
}

const IconButton: React.FC<IconButtonType> = (props) => {
    const { icon, click } = props;
    return (
        <div onClick={click} className={"rounded-full bg-gray-100 w-12 h-12 flex justify-center items-center text-[20px] active:bg-gray-300" + (click ? "  cursor-pointer hover:bg-gray-200" : " ")}>
            <FontAwesomeIcon icon={icon} />
        </div>
    );
};

export default IconButton;
