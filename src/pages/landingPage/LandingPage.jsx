import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Common/Button/Button';
import { CampgroundsContext } from 'contexts/CampgroundsContext';
import style from 'pages/LandingPage/LandingPage.module.scss';

const LandingPage = () => {
    const { campgroundsList } = useContext(CampgroundsContext);
    console.log(campgroundsList)
    const allCoverPhotos = campgroundsList.length && campgroundsList.map(item => item.campground.image);
    const coverUrls = allCoverPhotos.length && allCoverPhotos.flat().slice(0, 5);
    console.log(allCoverPhotos)
    console.log(coverUrls)
    const { landing, overlay, landing_header, landing_header_title, landing_header_subtitle, slideshow } = style;

    return ( 
        <div className={landing}>
            
            <div className={landing_header}>
                <h1 className={landing_header_title}>welcome to basecamp</h1>
                <h2 className={landing_header_subtitle}>enjoy your camping stay</h2>
                <Link to="/campgrounds">
                    <Button variant="solid" label="campgrounds"/>
                </Link>
                
            </div>
            <div className={overlay}></div> 
            <ul className={slideshow}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
                       
        </div>
     );
}
 
export default LandingPage;