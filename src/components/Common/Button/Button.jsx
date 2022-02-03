import React from 'react';
import styles from 'components/Common/Button/Button.module.scss';

const Button = ({ label, icon, variant, color }) => {
    const {basic, btnIcon ,outlined, solid} = styles;

    const variants = {
        outlined: outlined,
        solid: solid,
    }

    return ( 
        <button className={`${basic} ${variant ? variants[variant] : ''}`}>
            <span>{label}</span>
            <i className={btnIcon}>{icon}</i>
        </button>
     );
}
 
export default Button;