import React from 'react';

import style from 'components/Common/BurgerButton/BurgerButton.module.scss';

const BurgerButton = ({ isNavOpen, setIsNavOpen }) => {
    const { menu_burgerBtn, menu_burgerBtn_open, menu_burgerBtn_burger} = style;
    
    return ( 
    <div className={menu_burgerBtn} onClick={() => setIsNavOpen(!isNavOpen)}>
            <div className={`${menu_burgerBtn_burger} ${isNavOpen ? menu_burgerBtn_open : ''}`}></div>
        </div>  
     );
}
 
export default BurgerButton;