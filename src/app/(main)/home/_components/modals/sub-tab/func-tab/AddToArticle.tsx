import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { TAB_CODE } from "app/(main)/home/_constant/HomeConstant";
import { ModalContext } from "app/(main)/home/_providers/ModalProvider";
import { ModalContextType } from "app/(main)/home/_type/ModalType";
import IconButton from "components/limb/buttons/IconButton";
import React, { useContext } from "react";

export const LeftIconComponent: React.FC = () => {
  const { changeTabIndexModal } = useContext(ModalContext) as ModalContextType;

  return (
    <IconButton
      click={() => changeTabIndexModal(TAB_CODE.MAIN_TAB)}
      icon={faArrowLeft}
    />
  );
};

export const RightIconComponent: React.FC = () => {
  return <div className="w-12 h-12"></div>;
};

export const ChildrenIconComponent: React.FC = () => {
  const { changeTabIndexModal } = useContext(ModalContext) as ModalContextType;

  return (
    <div className="grid grid-cols-2 gap-2">
      <div
        onClick={() => changeTabIndexModal(TAB_CODE.EDIT_FILE)}
        className="flex items-center hover:bg-gray-100 p-4 rounded cursor-pointer"
      >
        <img className="mr-2" src="/image.png" alt="Not found" />
        <div>Picture/video</div>
      </div>
      <div
        onClick={() => changeTabIndexModal(TAB_CODE.TAG_FRIEND)}
        className="flex items-center hover:bg-gray-100 p-4 rounded cursor-pointer"
      >
        <img className="mr-2" src="/tag.png" alt="Not found" />
        <div>Tag other people</div>
      </div>
      <div
        onClick={() => changeTabIndexModal(TAB_CODE.EMOTION)}
        className="flex items-center hover:bg-gray-100 p-4 rounded cursor-pointer"
      >
        <img className="mr-2" src="/emoji-yellow.png" alt="Not found" />
        <div>Motion/Activity</div>
      </div>
      <div
        onClick={() => changeTabIndexModal(TAB_CODE.CHECKIN)}
        className="flex items-center hover:bg-gray-100 p-4 rounded cursor-pointer"
      >
        <img className="mr-2" src="/locate.png" alt="Not found" />
        <div>Check in</div>
      </div>
      <div className="flex items-center hover:bg-gray-100 p-4 rounded cursor-pointer">
        <img className="mr-2" src="/gif.png" alt="Not found" />
        <div>File GIF</div>
      </div>
      <div className="flex items-center hover:bg-gray-100 p-4 rounded cursor-pointer">
        <img className="mr-2" src="/livestream.png" alt="Not found" />
        <div>Livestream</div>
      </div>
      <div className="flex items-center hover:bg-gray-100 p-4 rounded cursor-pointer">
        <img className="mr-2" src="/event.png" alt="Not found" />
        <div>Event</div>
      </div>
    </div>
  );
};

export const title = "Add to your article";
