import { faArrowLeft, faImages, faPenToSquare, faTag, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/limb/buttons/IconButton';
import { TAB_CODE, TAB_IMAGE_NAV_CODE, TAB_VIDEO_NAV_CODE } from 'constants/HomeConstant';
import React, { useContext, useRef } from 'react';
import { convertToBlobFile } from 'utils/FileUtils';
import { generateRandomString } from 'utils/RandomUtils';
import { ImageModalType, ModalContextType, VideoModalType } from '../../../../../../types/pages/HomeType';
import { ModalContext } from 'providers/home/ModalProvider';

export const LeftIconComponent: React.FC = () => {
    const { changeTabIndexModal } = useContext(ModalContext) as ModalContextType;

    return (
        <IconButton click={() => changeTabIndexModal(TAB_CODE.MAIN_TAB)} icon={faArrowLeft} />
    )
};

export const RightIconComponent: React.FC = () => {
    return (
        <div className="w-12 h-12"></div>
    )
};

type FilePropsType = {
    fileModal: ImageModalType | VideoModalType
}

const FileComponent: React.FC<FilePropsType> = (props) => {
    const { changeTabIndexModal, changeFieldDataFileModal, dataModalState, setDataModalState } = useContext(ModalContext) as ModalContextType;
    const { fileModal } = props;
    const { blobUrl, type } = convertToBlobFile(fileModal.file);
    const isVideo = type.startsWith("video");

    return (
        <div className="has-tooltip mb-2">
            <div className="w-[300px] h-[200px] relative">
                {
                    type.startsWith('video') ? (
                        <video className="w-[300px] h-[200px]" controls>
                            <source src={`${blobUrl}`} type={"video/mp4"} />
                        </video>
                    ) : (
                        <img className="w-full h-full" src={`${blobUrl}`} alt="Not found" />
                    )
                }
                <div className="tooltip invisible absolute flex top-[20px] right-[10px]">
                    <IconButton click={() => setDataModalState({
                        ...dataModalState,
                        files: dataModalState.files?.filter(current => current.id != fileModal.id)
                    })} icon={faXmark} />
                </div>
                <div className="tooltip invisible absolute flex top-[20px] left-[10px]">
                    <button onClick={
                        () => changeTabIndexModal(
                            isVideo ? TAB_CODE.DETAIL_VIDEO : TAB_CODE.DETAIL_IMAGE,
                            fileModal,
                            isVideo ? TAB_VIDEO_NAV_CODE.TEXTAREA : TAB_IMAGE_NAV_CODE.TEXTAREA
                        )}
                        className="flex items-center justify-between bg-white p-2 rounded hover:bg-gray-200 active:bg-gray-300">
                        <span className="mr-2"><FontAwesomeIcon icon={faPenToSquare} /></span>
                        <span>Edit</span>
                    </button>
                </div>
                <div className="tooltip invisible absolute flex bottom-[20px] left-[10px]">
                    <IconButton click={
                        () => changeTabIndexModal(
                            isVideo ? TAB_CODE.DETAIL_VIDEO : TAB_CODE.DETAIL_IMAGE,
                            fileModal,
                            isVideo ? TAB_VIDEO_NAV_CODE.THUMBNAIL : TAB_IMAGE_NAV_CODE.TAG
                        )}
                        icon={faTag} />
                </div>
            </div>
            <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                fileModal.note = e.target.value;
                changeFieldDataFileModal(fileModal);
            }} className="w-full p-2 outline-none resize-none border border-gray-300 mt-2" rows={3} placeholder="Note" value={fileModal.note}></textarea>
        </div>
    )

}


export const ChildrenIconComponent: React.FC = () => {
    const { dataModalState, setDataModalState, changeTabIndexModal } = useContext(ModalContext) as ModalContextType;
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length == undefined) return;
        upload(event.target.files);
    }

    const upload = async (fileList: FileList) => {
        let files: ImageModalType | VideoModalType[] = [];
        if (dataModalState.files) {
            files = [...dataModalState.files];
        }
        for (var i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const { type } = convertToBlobFile(file);
            if (type.startsWith("video")) {
                const videoModal: VideoModalType = {
                    id: generateRandomString(5),
                    file: fileList[i]
                };
                files.push(videoModal);
            } else {
                const imageModal: ImageModalType = {
                    id: generateRandomString(5),
                    file: fileList[i]
                }
                files.push(imageModal);
            }
        }
        setDataModalState({
            ...dataModalState,
            files
        });
    }

    return (
        <div>
            <div className="max-h-[500px] overflow-scroll flex flex-wrap justify-between">
                {
                    dataModalState.files?.map((item) => {
                        return <FileComponent key={item.id} fileModal={item} />
                    })
                }
            </div>
            <input
                type="file"
                multiple
                onChange={onChangeFile}
                hidden
                accept="image/*, video/*"
                ref={inputRef}
            />
            <div className="flex justify-end mt-2">
                <button onClick={() => inputRef.current?.click()} className="flex ml-2 items-center justify-between bg-white text-blue-600 min-w-[100px] p-2 rounded hover:bg-gray-200 active:bg-gray-300">
                    <span className="mr-2"><FontAwesomeIcon icon={faImages} /></span>
                    <span>Add image/video</span>
                </button>
                <button onClick={() => changeTabIndexModal(TAB_CODE.MAIN_TAB) } className="flex ml-2 items-center justify-between p-2 rounded text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700">Done</button>
            </div>
        </div>
    )
};

export const title = "Image/Video";