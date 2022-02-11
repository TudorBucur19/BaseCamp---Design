import React from 'react';
import styles from 'components/Common/Button/Button.module.scss';

const Button = ({ label, rightIcon, leftIcon, variant, color, onClick }) => {
    const {btn, basic, rIcon, lIcon, outlined, solid, navBar, colorPrimary, colorSecondary, colorThird} = styles;

    const variants = {
        basic: basic,
        outlined: outlined,
        solid: solid,
        navBar: navBar,
    };

    const colors = {
        primary: colorPrimary,
        secondary: colorSecondary,
        third: colorThird
    }

    return ( 
        <button className={`${btn} ${variant ? variants[variant] : ''} ${color ? colors[color] : ''}`} onClick={onClick}>
            <i className={leftIcon && lIcon}>{leftIcon}</i>
            <span>{label}</span>
            <i className={rightIcon && rIcon}>{rightIcon}</i>
        </button>
     );
}
 
export default Button;