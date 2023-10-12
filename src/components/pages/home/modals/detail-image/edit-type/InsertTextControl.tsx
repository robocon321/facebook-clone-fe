import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { ImageModalType, ModalContextType, TextImageType } from "types/pages/HomeType";
import { convertToBlobFile } from "utils/FileUtils";
import { DraggableData, ResizableDelta, Rnd } from "react-rnd";
import { generateRandomString } from 'utils/RandomUtils';
import { ModalContext } from 'providers/home/ModalProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type EditImageType = {
    fileModal: ImageModalType,
    imageRef: React.MutableRefObject<HTMLImageElement | null>
}

let restartWidth = 0;
let restartSize = 32;
let imageInfo: any = null;


const InsertTextControl = forwardRef((props: EditImageType, ref) => {
    const { changeFieldDataFieldModal } = useContext(ModalContext) as ModalContextType;
    const { fileModal, imageRef } = props;

    useImperativeHandle(ref, () => {
        return {
            handleClick: (event: React.MouseEvent) => {
                if (imageRef.current) {
                    const image = imageRef.current;
                    if (imageInfo == null) {
                        const imageLeft = image.getBoundingClientRect().left;
                        const imageTop = image.getBoundingClientRect().top;
                        const imageWidth = image.getBoundingClientRect().width;
                        const imageHeight = image.getBoundingClientRect().height;

                        imageInfo = {
                            left: imageLeft,
                            top: imageTop,
                            width: imageWidth,
                            height: imageHeight
                        }
                    }

                    addNewTextToFileModal(event);
                }
            }
        }
    }, []);

    const addNewTextToFileModal = (event: React.MouseEvent) => {
        if (imageInfo) {
            const x = event.clientX - imageInfo.left;
            const y = event.clientY - imageInfo.top;

            const percentX = x * 100 / imageInfo.width;
            const percentY = y * 100 / imageInfo.height;

            const newText: TextImageType = {
                id: generateRandomString(10),
                text: 'ABC',
                color: 'white',
                size: 32,
                x_pos: percentX,
                y_pos: percentY
            }

            fileModal.texts = fileModal.texts ? [...fileModal.texts, newText] : [newText];
            changeFieldDataFieldModal(fileModal);

        }
    }

    const onRemoveTextModal = (id: string) => {
        fileModal.texts = fileModal.texts?.filter(item => item.id != id);
        changeFieldDataFieldModal(fileModal);
    }

    const changePosition = (d: DraggableData, previousItem: TextImageType) => {
        if (imageInfo) {
            const newXPos = d.x * 100 / imageInfo.width;
            const newYPos = d.y * 100 / imageInfo.height;
            const newItem: TextImageType = {
                ...previousItem,
                x_pos: newXPos,
                y_pos: newYPos
            }
            fileModal.texts = fileModal.texts?.map(item => {
                if (item.id == previousItem.id) {
                    return newItem
                } else {
                    return item;
                }
            })
            changeFieldDataFieldModal(fileModal);
        }
    }

    const changeSelectedText = (id: string) => {
        fileModal.selectedText = id;
        changeFieldDataFieldModal(fileModal);
    }

    const changeSize = (delta: ResizableDelta, ref: HTMLElement, previousItem: TextImageType) => {
        if (imageInfo) {
            const newSize = restartSize * (restartWidth + delta.width) / (restartWidth);
            const newItem: TextImageType = {
                ...previousItem,
                size: newSize
            }

            fileModal.texts = fileModal.texts?.map(item => {
                if (item.id == previousItem.id) {
                    return newItem;
                } else {
                    return item;
                }
            });

            changeFieldDataFieldModal(fileModal);
        }
    }

    return (<>
        {
            fileModal.texts && fileModal.texts.map(item => {
                let x = 0;
                let y = 0;
                if (imageInfo) {
                    x = item.x_pos * imageInfo.width / 100;
                    y = item.y_pos * imageInfo.height / 100;
                }

                const itemStyle = {
                    padding: '5px',
                    fontSize: `${item.size}px`,
                    color: item.color
                }

                return (
                    <Rnd
                        key={item.id}
                        position={{ x, y }}
                        lockAspectRatio
                        onDragStop={(e, d) => {
                            changePosition(d, item);
                        }}
                        onResizeStart={(e, direction, ref) => {
                            restartWidth = ref.offsetWidth;
                            restartSize = item.size;
                        }}
                        onResize={(e, direction, ref, delta, position) => {
                            changeSize(delta, ref, item);
                        }}
                        className="group"
                    >
                        <div
                            onClick={() => changeSelectedText(item.id)} 
                            className="relative hover:border hover:border-white py-2 box-border">
                            <span 
                                placeholder='Enter your text'
                                style={itemStyle}
                                className="outline-none font-semibold" contentEditable="true" suppressContentEditableWarning={true}>                                
                            </span>
                            <span
                                onClick={() => onRemoveTextModal(item.id)}
                                className="z-10 absolute invisible group-hover:visible rounded-full bg-white border w-[30px] h-[30px] flex justify-center items-center top-0 left-0 translate-x-[-50%] translate-y-[-50%] cursor-pointer">
                                <FontAwesomeIcon icon={faXmark} />
                            </span>
                        </div>
                    </Rnd>

                )
            })
        }
    </>
    )
});

export default InsertTextControl;