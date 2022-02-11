import React from 'react';
import style from 'components/Common/HeaderStripe/HeaderStripe.module.scss';

const HeaderStripe = ({ title, subtitle }) => {
    const { container, container_title, container_subtitle, container_bottomLine } = style;

    return ( 
        <div className={container}>
            <h1 className={container_title}>{title}</h1>
            <h2 className={container_subtitle}>{subtitle}</h2>
            <div className={container_bottomLine}></div>
        </div>
     );
}
 
export default HeaderStripe;