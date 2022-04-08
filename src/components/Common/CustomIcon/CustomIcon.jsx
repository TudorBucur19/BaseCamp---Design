import React from 'react';

import style from 'components/Common/CustomIcon/CustomIcon.module.scss';

const CustomIcon = ({ icon, label, size, color="primary" }) => {
    const { iconContainer, iconContainer_icon, iconContainer_label, smallIcon, largeIcon, colorPrimary, colorBasic } = style;
    const sizes = {
        small: smallIcon,
        large: largeIcon,
    };

    const colors = {
        basic: colorBasic,
        primary: colorPrimary
    }

    return (
        <div className={`${iconContainer} ${sizes[size]} ${colors[color]}`}> 
            <i className={iconContainer_icon }>
                {icon}
            </i>
            <span className={iconContainer_label}>{label}</span>
        </div>
     );
}
 
export default CustomIcon;