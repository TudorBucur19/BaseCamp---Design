import React from 'react';
import styles from 'components/Common/Button/Button.module.scss';

const Button = ({ label, rightIcon, leftIcon, variant }) => {
    const {btn, basic, rIcon, lIcon, outlined, solid} = styles;

    const variants = {
        basic: basic,
        outlined: outlined,
        solid: solid,
    };

    return ( 
        <button className={`${btn} ${variant ? variants[variant] : ''}`}>
            <i className={lIcon}>{leftIcon}</i>
            <span>{label}</span>
            <i className={rIcon}>{rightIcon}</i>
        </button>
     );
}
 
export default Button;