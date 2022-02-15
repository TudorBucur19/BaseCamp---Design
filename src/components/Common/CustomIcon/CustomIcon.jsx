import React from 'react';

import style from 'components/Common/CustomIcon/CustomIcon.module.scss';

const CustomIcon = ({ icon, label, size }) => {
    const { iconContainer, iconContainer_icon, iconContainer_label, smallIcon, largeIcon } = style;
    const sizes = {
        small: smallIcon,
        large: largeIcon,
    };

    return (
        <div className={`${iconContainer} ${sizes[size]}`}> 
            <i className={iconContainer_icon }>
                {icon}
            </i>
            <span className={iconContainer_label}>{label}</span>
        </div>
     );
}
 
export default CustomIcon;