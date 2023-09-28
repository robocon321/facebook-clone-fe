import React from 'react';

type ModalParameterType = {
    title: string,
    leftIcon?: React.ReactNode,
    rightIcon?: React.ReactNode,
    children?: React.ReactNode
}

const ModalTemplate: React.FC<ModalParameterType> = (props) => {
    const { title, leftIcon, rightIcon, children } = props;

    return (
        <div className='min-w-full'>
            <div className="flex items-center justify-between border-b p-4 rounded-t dark:border-gray-600 border-gray-800">
                {leftIcon}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white incline">
                    {title}
                </h3>
                {rightIcon}
            </div>
            <div className="p-6 space-y-6">
                {children}
            </div>
        </div>

    );
};

export default ModalTemplate;
