import React from 'react';
import { ImageModalType } from "types/pages/HomeType";
import { convertToBlobFile } from "utils/FileUtils";
type EditImageType = {
    fileModal: ImageModalType
}

const CommonControl: React.FC<EditImageType> = (props) => {
    const { fileModal } = props;
    const { blobUrl } = convertToBlobFile(fileModal.file);

    return (
        <div className={"relative p-8 bg-gray-800 w-full h-full flex justify-center items-center"}>
            <div className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 text-white">Click any position on image to tag your friends</div>
            <div className="relative">
                <img className="max-w-full" src={blobUrl} alt="Not found" />
            </div>
        </div>
    )
}

export default CommonControl;