import ModalTemplate from 'components/limb/modal/ModalTemplate';
import React from 'react';

export type SubTabType = {
    title: string,
    leftIcon?: React.ReactNode,
    rightIcon?: React.ReactNode,
    children?: React.ReactNode
}

const SubTab: React.FC<SubTabType> = (props) => {
    const { title, leftIcon, rightIcon, children } = props;
    return (
        <ModalTemplate title={title} leftIcon={leftIcon} rightIcon={rightIcon} >
            {children}
        </ModalTemplate>
    );
};

export default SubTab;
