"use client"

import { faImages, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "components/limb/button/IconButton";
import { FileModalType, HomeContext, HomeContextType } from "providers/HomeProvider";
import { useRef, useContext } from "react";
import { convertToBlobFile } from "utils/FileUtils";
import { generateRandomString } from "utils/RandomUtils";

const DragDropFiles = () => {
    const { setDataModal, changeTabIndexModal, homeState, setHomeState } = useContext(HomeContext) as HomeContextType;
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
    }

    const upload = async (fileList: FileList) => {
        const images: FileModalType[] = [...homeState.modal.data.images];
        for (var i = 0; i < fileList.length; i++) {
            images.push({
                id: generateRandomString(5),
                file: fileList[i]
            });
        }
        setDataModal("images", images);
    }

    const resetImageVideoPost = (event: React.MouseEvent) => {
        event.stopPropagation();
        setHomeState({
            ...homeState,
            modal: {
                ...homeState.modal,
                isChooseFile: false,
                data: {
                    images: []
                }
            }
        })
    }

    if (homeState.modal.data.images.length > 0) {
        return (
            <div className="has-tooltip max-h-[400px] max-h-[200px] relative flex flex-col justify-center items-center my-4 border-[1px] border-gray-200 hover:bg-gray-200 cursor-pointer">
                <input
                    type="file"
                    multiple
                    onChange={onChangeFile}
                    hidden
                    accept="image/*, video/*"
                    ref={inputRef}
                />
                <div className="flex-wrap overflow-scroll flex items-center">
                    {
                        homeState.modal.data.images.map((item, index) => {
                            const { blobUrl, type} = convertToBlobFile(item.file);
                            if (type.startsWith('video')) {
                                return (
                                    <div key={index} className="max-w-[250px] m-4">
                                        <video controls>
                                            <source src={`${blobUrl}`} type={"video/mp4"} />
                                        </video>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className="max-w-[250px] m-4">
                                        <img className="w-full h-full" src={`${blobUrl}`} alt="Not found" />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className="tooltip invisible absolute flex top-[10px] left-[10px]">
                    <button onClick={() => changeTabIndexModal(2)} className="flex items-center justify-between bg-white min-w-[100px] p-2 rounded hover:bg-gray-200 active:bg-gray-300">
                        <span className="mr-2"><FontAwesomeIcon icon={faPenToSquare} /></span>
                        <span>Edit all</span>
                    </button>
                    <button onClick={() => inputRef.current?.click()} className="flex ml-2 items-center justify-between bg-white min-w-[100px] p-2 rounded hover:bg-gray-200 active:bg-gray-300">
                        <span className="mr-2"><FontAwesomeIcon icon={faImages} /></span>
                        <span>Add image/video</span>
                    </button>
                </div>
                <div className="absolute flex top-[10px] right-[10px]">
                    <IconButton click={resetImageVideoPost} icon={faXmark} />
                </div>
            </div>
        )
    } else {
        return (
            <>
                <div
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
                    <IconButton click={() => { }} icon={faImages} />
                    <div className="font-bold">Add picture/video</div>
                    <span>or drag and drop</span>
                    <div className="absolute flex top-[10px] right-[10px]">
                        <IconButton click={resetImageVideoPost} icon={faXmark} />
                    </div>

                </div>
            </>
        );

    }
};

export default DragDropFiles;