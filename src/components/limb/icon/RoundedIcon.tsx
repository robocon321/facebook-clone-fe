import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type RoundedIconType = {
  icon: IconDefinition;
};

const RoundedIcon: React.FC<RoundedIconType> = (props) => {
  const { icon } = props;
  return (
    <div className="rounded-full bg-gray-100 w-12 h-12 flex justify-center items-center text-[20px] cursor-pointer hover:bg-gray-200 active:bg-gray-300">
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default RoundedIcon;
