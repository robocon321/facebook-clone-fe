import ModalTemplate from 'components/limb/modal/ModalTemplate';
import React from 'react';
import { SubTabType } from '../../../../types/pages/HomeType';

const SubTab: React.FC<SubTabType> = (props) => {
    const { title, leftIcon, rightIcon, children } = props;
    return (
        <ModalTemplate title={title} leftIcon={leftIcon} rightIcon={rightIcon} >
            {children}
        </ModalTemplate>
    );
};

export default SubTab;
