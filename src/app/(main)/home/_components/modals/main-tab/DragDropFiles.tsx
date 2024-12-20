"use client";

import {
  faImages,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TAB_CODE } from "app/(main)/home/_constant/HomeConstant";
import { ModalContext } from "app/(main)/home/_providers/ModalProvider";
import {
  ImageModalType,
  ModalContextType,
  VideoModalType,
} from "app/(main)/home/_type/ModalType";
import IconButton from "components/limb/buttons/IconButton";
import { useContext, useRef } from "react";
import { convertToBlobFile } from "utils/FileUtils";
import { generateRandomString } from "utils/RandomUtils";

const DragDropFiles = () => {
  const {
    changeTabIndexModal,
    dataModalState,
    setDataModalState,
    controlModalState,
    setControlModalState,
  } = useContext(ModalContext) as ModalContextType;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    upload(event.dataTransfer.files);
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length == undefined) return;
    upload(event.target.files);
  };

  const upload = (fileList: FileList) => {
    const files: (VideoModalType | ImageModalType)[] = [
      ...dataModalState.files,
    ];
    for (const element of fileList) {
      const file = element;
      const { type } = convertToBlobFile(file);
      if (type.startsWith("video")) {
        const videoModal: VideoModalType = {
          id: generateRandomString(5),
          file: element,
          created_date: new Date(),
        };
        files.push(videoModal);
      } else {
        const imageModal: ImageModalType = {
          id: generateRandomString(5),
          file: element,
          created_date: new Date(),
          tags: [],
          texts: [],
        };
        files.push(imageModal);
      }
    }
    setDataModalState({
      ...dataModalState,
      files,
    });
  };

  const resetImageVideoArticle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setControlModalState({
      ...controlModalState,
      isChooseFile: false,
    });
    setDataModalState({
      ...dataModalState,
      files: [],
    });
  };

  if (dataModalState.files.length > 0) {
    return (
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="has-tooltip max-h-[400px] max-h-[200px] relative flex flex-col justify-center items-center my-4 border-[1px] border-gray-200 hover:bg-gray-200 cursor-pointer"
      >
        <input
          type="file"
          multiple
          onChange={onChangeFile}
          hidden
          accept="image/*, video/*"
          ref={inputRef}
        />
        <div className="flex-wrap overflow-scroll flex items-center">
          {dataModalState.files.map((item, index) => {
            const { blobUrl, type } = convertToBlobFile(item.file);
            if (type.startsWith("video")) {
              return (
                <div key={item.id} className="max-w-[250px] m-4">
                  <video controls>
                    <source src={`${blobUrl}`} type={"video/mp4"} />
                  </video>
                </div>
              );
            } else {
              return (
                <div key={item.id} className="max-w-[250px] m-4">
                  <img
                    className="w-full h-full"
                    src={`${blobUrl}`}
                    alt="Not found"
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="tooltip invisible absolute flex top-[10px] left-[10px]">
          <button
            onClick={() => changeTabIndexModal(TAB_CODE.EDIT_FILE)}
            className="flex items-center justify-between bg-white min-w-[100px] p-2 rounded hover:bg-gray-200 active:bg-gray-300"
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
            <span>Edit all</span>
          </button>
          <button
            onClick={() => inputRef.current?.click()}
            className="flex ml-2 items-center justify-between bg-white min-w-[100px] p-2 rounded hover:bg-gray-200 active:bg-gray-300"
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faImages} />
            </span>
            <span>Add image/video</span>
          </button>
        </div>
        <div className="absolute flex top-[10px] right-[10px]">
          <IconButton click={resetImageVideoArticle} icon={faXmark} />
        </div>
      </div>
    );
  } else {
    return (
      <button
        className="relative flex flex-col justify-center items-center h-[200px] my-4 p-8 border-[1px] border-gray-200 hover:bg-gray-200 cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          multiple
          onChange={onChangeFile}
          hidden
          accept="image/*, video/*"
          ref={inputRef}
        />
        <IconButton click={() => {}} icon={faImages} />
        <div className="font-bold">Add picture/video</div>
        <span>or drag and drop</span>
        <div className="absolute flex top-[10px] right-[10px]">
          <IconButton click={resetImageVideoArticle} icon={faXmark} />
        </div>
      </button>
    );
  }
};

export default DragDropFiles;
