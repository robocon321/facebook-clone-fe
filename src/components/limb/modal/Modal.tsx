import React from 'react';
import { ModalParameterType } from 'types/pages/HomeType';

const Modal: React.FC<ModalParameterType> = (props) => {
    const { children, isShow, width } = props;

    return (
        <div id="defaultModal" tabIndex={-1} aria-hidden="true" className={"fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0" + (isShow ? '' : ' hidden')} style={{
            backgroundColor: "rgba(0, 1, 0, 0.6)"
        }}>
            <div className={"relative w-full max-h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-[max-width] duration-200 " + (width == undefined ? "max-w-2xl" : width)}>
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
