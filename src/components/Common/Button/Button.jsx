import React from 'react';
import styles from 'components/Common/Button/Button.module.scss';

const Button = ({ label, rightIcon, leftIcon, variant, onClick }) => {
    const {btn, basic, rIcon, lIcon, outlined, solid, navBar} = styles;

    const variants = {
        basic: basic,
        outlined: outlined,
        solid: solid,
        navBar: navBar,
    };

    return ( 
        <button className={`${btn} ${variant ? variants[variant] : ''}`} onClick={onClick}>
            <i className={leftIcon && lIcon}>{leftIcon}</i>
            <span>{label}</span>
            <i className={rightIcon && rIcon}>{rightIcon}</i>
        </button>
     );
}
 
export default Button;