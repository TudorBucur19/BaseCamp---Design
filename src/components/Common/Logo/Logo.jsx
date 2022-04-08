import React from 'react';
import { FaCampground } from 'react-icons/fa';

import style from 'components/Common/Logo/Logo.module.scss';

const Logo = () => {
    const { logoContainer, logoContainer_icon, logoContainer_text } = style;

    return ( 
        <div className={logoContainer}>
            <FaCampground className={logoContainer_icon}/>
            <div className={logoContainer_text}>BaseCamp</div>
        </div>
     );
}
 
export default Logo;