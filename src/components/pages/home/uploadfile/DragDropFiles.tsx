"use client"

import { faImages, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "components/limb/button/IconButton";
import { HomeContext, HomeContextType } from "providers/HomeProvider";
import { useState, useRef, useContext } from "react";

const DragDropFiles = () => {
    const { setModal, setDataModal, homeState, setHomeState } = useContext(HomeContext) as HomeContextType;
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const images: string[] = Array.from(event.dataTransfer.files).map(item => item.name);
        setDataModal("images", images);
    };

    const onDropDropChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files?.length == undefined) return ;
        const images: string[] = Array.from(event.target.files).map(item => item.name);
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

    // send files to the server // learn from my other video
    const handleUpload = () => {
        const formData = new FormData();
        // formData.append("Files", files);
        // fetch(
        //   "link", {
        //     method: "POST",
        //     body: formData
        //   }  
        // )
    };

    if (homeState.modal.data.images.length > 0) return (
        <div className="has-tooltip max-h-[400px] relative flex flex-col justify-center items-center h-[200px] my-4 p-8 border-[1px] border-gray-200 hover:bg-gray-200 cursor-pointer">
            {/* <ul>
                {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
            </ul> */}
            <div className="tooltip invisible absolute flex top-[10px] left-[10px]">
                <button className="flex items-center justify-between bg-white min-w-[100px] p-2 rounded">
                    <span className="mr-2"><FontAwesomeIcon icon={faPenToSquare} /></span>
                    <span>Edit all</span>
                </button>
                <button className="flex ml-2 items-center justify-between bg-white min-w-[100px] p-2 rounded">
                    <span className="mr-2"><FontAwesomeIcon icon={faImages} /></span>
                    <span>Add image/video</span>
                </button>
            </div>
            <div className="absolute flex top-[10px] right-[10px]">
                <IconButton click={resetImageVideoPost} icon={faXmark} />
            </div>
        </div>
    )

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
                    onChange={onDropDropChange}
                    hidden
                    accept="image/png, image/jpeg"
                    ref={inputRef}
                />
                <IconButton click={()=>{}} icon={faImages} />
                <div className="font-bold">Add picture/video</div>
                <span>or drag and drop</span>
                <div className="absolute flex top-[10px] right-[10px]">
                    <IconButton click={resetImageVideoPost} icon={faXmark} />
                </div>

            </div>            
        </>
    );
};

export default DragDropFiles;