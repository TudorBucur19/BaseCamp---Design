import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { navBarItems } from 'utils/configValues';
import { AuthenticationContext } from 'contexts/AuthenticationContext';
import Logo from 'components/Common/Logo/Logo';
import Button from 'components/Common/Button/Button';
import BurgerButton from 'components/Common/BurgerButton/BurgerButton';
import style from 'components/Navbar/NavBar.module.scss';

const NavBar = () => {
    const { user, handleLogout } = useContext(AuthenticationContext);
    const [isNavOpen, setIsNavOpen] = useState(false)
    const { 
        headerContainer, 
        headerContainer_logo,
        headerContainer_nav, 
        headerContainer_nav_items, 
        headerContainer_nav_items_menuItem,
        headerContainer_nav_items_onlyUser,
        mobileNavOpen,
    } = style;

    return ( 
        <header className={headerContainer}>
            <div className={headerContainer_logo}>
                <Link to="/campgrounds">
                    <Logo/>
                </Link>
                <BurgerButton {...{isNavOpen, setIsNavOpen}} />
            </div>
            <nav className={`${headerContainer_nav} ${isNavOpen ? mobileNavOpen : ''}` }>
                <ul className={headerContainer_nav_items}>
                    {navBarItems.map(item => 
                        <li 
                        className={`${headerContainer_nav_items_menuItem} ${!user && item.onlyUser ? headerContainer_nav_items_onlyUser : ''}`} 
                        key={item.path}
                        >
                            <Link to={item.path}>{item.label}</Link>
                        </li>                        
                    )}
                    {user ?
                    <li className={headerContainer_nav_items_menuItem}>
                        <Button variant="navBar" label="Log Out" onClick={handleLogout}/>
                    </li>
                    :
                    <li className={headerContainer_nav_items_menuItem}>
                        <Link to="/login">Log In</Link>
                    </li>
                    }
                </ul>
            </nav>
        </header>
     );
}
 
export default NavBar;