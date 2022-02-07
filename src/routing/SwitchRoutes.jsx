import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routes from 'routing/Routes';
import PrimarySearchAppBar from 'components/navbar/AppBar';
import Footer from 'components/Footer/Footer';
import NavBar from 'components/navbar/NavBar';

const SwitchRoutes = ({ routes }) => {
    return ( 
        <>
        <NavBar/>
        {/* <PrimarySearchAppBar/> */}
            <Switch>
                {routes.map((route) => {
                    return <Routes 
                            key={route.key} 
                            {...route}                        
                            /> 
                })
                }
                <Route component={() => <h2>Page not found</h2>} />
            </Switch>
        <Footer/>
        </>
     );
}
 
export default SwitchRoutes;