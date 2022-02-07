import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { navBarItems } from 'utils/configValues';
import { AuthenticationContext } from 'contexts/AuthenticationContext';
import Logo from 'components/Common/Logo/Logo';
import style from 'components/navbar/NavBar.module.scss';
import Button from 'components/Common/Button/Button';

const NavBar = () => {
    const { user, handleLogout } = useContext(AuthenticationContext);
    const { 
        headerContainer, 
        headerContainer_nav, 
        headerContainer_nav_items, 
        headerContainer_nav_items_menuItem,
        headerContainer_nav_items_onlyUser
    } = style;

    return ( 
        <header className={headerContainer}>
            <Logo/>
            <nav className={headerContainer_nav}>
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