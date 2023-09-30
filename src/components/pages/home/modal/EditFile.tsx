import React, { useContext, useRef } from 'react';
import { faArrowLeft, faImages, faPenToSquare, faTag, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FileModalType, HomeContext, HomeContextType } from 'providers/HomeProvider';
import IconButton from 'components/limb/button/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertToBlobFile } from 'utils/FileUtils';
import { generateRandomString } from 'utils/RandomUtils';

export const LeftIconComponent: React.FC = () => {
    const { setModal } = useContext(HomeContext) as HomeContextType;

    return (
        <IconButton click={() => setModal('tabIndexModal', 0)} icon={faArrowLeft} />
    )
};

export const RightIconComponent: React.FC = () => {
    return (
        <div className="w-12 h-12"></div>
    )
};

type FileComponentType = {
    blobUrl: string,
    item: FileModalType
}

const ImageComponent: React.FC<FileComponentType> = (props) => {
    const { homeState, setHomeState } = useContext(HomeContext) as HomeContextType;
    const { blobUrl, item } = props;
    return (
        <div className="has-tooltip mb-2">
            <div className="w-[300px] h-[200px] relative">
                <img className="w-full h-full" src={`${blobUrl}`} alt="Not found" />
                <div className="tooltip invisible absolute flex top-[20px] right-[10px]">
                    <IconButton click={() => setHomeState({
                        ...homeState,
                        modal: {
                            ...homeState.modal,
                            data: {
                                ...homeState.modal.data,
                                images: homeState.modal.data.images.filter(current => current.id != item.id)
                            }
                        }
                    })} icon={faXmark} />
                </div>
                <div className="tooltip invisible absolute flex top-[20px] left-[10px]">
                    <button onClick={() => { }} className="flex items-center justify-between bg-white p-2 rounded hover:bg-gray-200 active:bg-gray-300">
                        <span className="mr-2"><FontAwesomeIcon icon={faPenToSquare} /></span>
                        <span>Edit</span>
                    </button>
                </div>
                <div className="tooltip invisible absolute flex bottom-[20px] left-[10px]">
                    <IconButton click={() => { }} icon={faTag} />
                </div>
            </div>
            <textarea className="w-full p-2 outline-none resize-none border border-gray-300 mt-2" rows={3} placeholder="Note"></textarea>
        </div>
    )

}

const VideoComponent: React.FC<FileComponentType> = (props) => {
    const { homeState, setHomeState } = useContext(HomeContext) as HomeContextType;
    const { blobUrl, item } = props;
    return (
        <div className="has-tooltip mb-2">
            <div className="relative">
                <video className="w-[300px] h-[200px]" controls>
                    <source src={`${blobUrl}`} type={"video/mp4"} />
                </video>
                <div className="tooltip invisible absolute flex top-[20px] right-[10px]">
                    <IconButton click={() => setHomeState({
                        ...homeState,
                        modal: {
                            ...homeState.modal,
                            data: {
                                ...homeState.modal.data,
                                images: homeState.modal.data.images.filter(current => current.id != item.id)
                            }
                        }
                    })} icon={faXmark} />
                </div>
                <div className="tooltip invisible absolute flex top-[20px] left-[10px]">
                    <button onClick={() => { }} className="flex items-center justify-between bg-white p-2 rounded hover:bg-gray-200 active:bg-gray-300">
                        <span className="mr-2"><FontAwesomeIcon icon={faPenToSquare} /></span>
                        <span>Edit</span>
                    </button>
                </div>
                <div className="tooltip invisible absolute flex bottom-[20px] left-[10px]">
                    <IconButton click={() => { }} icon={faTag} />
                </div>
            </div>
            <textarea className="w-full p-2 outline-none resize-none border border-gray-300 mt-2" rows={3} placeholder="Note"></textarea>
        </div>
    )    
}

export const ChildrentIconComponent: React.FC = () => {
    const { homeState, setDataModal } = useContext(HomeContext) as HomeContextType;
    const inputRef = useRef<HTMLInputElement | null>(null);
    
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

    return (
        <div>
            <div className="max-h-[500px] overflow-scroll flex flex-wrap justify-between">
                {
                    homeState.modal.data.images.map((item) => {
                        const { blobUrl, type } = convertToBlobFile(item.file);
                        if (type.startsWith('video')) {
                            return <VideoComponent key={item.id} blobUrl={blobUrl} item={item} /> 
                        } else {
                            return <ImageComponent key={item.id} blobUrl={blobUrl} item={item} />
                        }
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
                <button className="flex ml-2 items-center justify-between p-2 rounded text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700">Xong</button>
            </div>
        </div>
    )
};

export const title = "Image/Video";