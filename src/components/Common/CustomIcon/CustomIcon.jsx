import React from 'react';
import style from 'components/Common/CustomIcon/CustomIcon.module.scss';

const CustomIcon = ({ icon }) => {
    const { iconContainer } = style;
    return ( 
        <i className={iconContainer}>
            {icon}
        </i>
     );
}
 
export default CustomIcon;