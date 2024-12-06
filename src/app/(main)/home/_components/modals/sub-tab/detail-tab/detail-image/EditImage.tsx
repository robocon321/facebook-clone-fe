import InsertTextControl from "app/(main)/home/_components/modals/sub-tab/detail-tab/detail-image/edit-types/InsertTextControl";
import TagControl from "app/(main)/home/_components/modals/sub-tab/detail-tab/detail-image/edit-types/TagControl";
import { TAB_IMAGE_NAV_CODE } from "app/(main)/home/_constant/HomeConstant";
import { ModalContext } from "app/(main)/home/_providers/ModalProvider";
import {
  ImageModalType,
  ModalContextType,
} from "app/(main)/home/_type/ModalType";
import React, { useContext, useRef } from "react";
import { convertToBlobFile } from "utils/FileUtils";

type EditImageType = {
  fileModal: ImageModalType;
};

const EditImageComponent: React.FC<EditImageType> = (props) => {
  const { controlModalState } = useContext(ModalContext) as ModalContextType;
  const { fileModal } = props;
  const { blobUrl } = convertToBlobFile(fileModal.file);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const editImageRef = useRef<any>(null);

  return (
    <div
      className={
        "relative p-8 bg-gray-800 w-full h-full flex justify-center items-center"
      }
    >
      {controlModalState.navTabDetailIndex == TAB_IMAGE_NAV_CODE.TAG ? (
        <div className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 text-white">
          Click any position on image to tag your friends
        </div>
      ) : controlModalState.navTabDetailIndex == TAB_IMAGE_NAV_CODE.TEXT ? (
        <div className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 text-white">
          Click any position on image to text your friends
        </div>
      ) : (
        <></>
      )}
      <div className="relative">
        <img
          ref={imageRef}
          onClick={(e) => editImageRef.current?.handleClick(e)}
          className="max-w-full cursor-pointer"
          src={blobUrl}
          alt="Not found"
        />
        {controlModalState.navTabDetailIndex == TAB_IMAGE_NAV_CODE.TAG ? (
          <TagControl
            fileModal={fileModal}
            ref={editImageRef}
            imageRef={imageRef}
          />
        ) : controlModalState.navTabDetailIndex == TAB_IMAGE_NAV_CODE.TEXT ? (
          <InsertTextControl
            fileModal={fileModal}
            ref={editImageRef}
            imageRef={imageRef}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default EditImageComponent;
