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

    const { 
        landing, 
        overlay, 
        landing_header, 
        landing_header_title, 
        landing_header_subtitle, 
        slideshow, 
        slideshow_item, 
        slideshow_item_image,
        delay1,
        delay2,
        delay3,
        delay4,
    } = style;

    const animationDelays = [delay1, delay2, delay3, delay4];

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
                {coverUrls?.map((image, index)=> (
                    <li className={`${slideshow_item} ${index > 0 ? animationDelays[index-1] : ''}`} key={image.name}>
                        <img src={image.url} alt="main camp cover" className={slideshow_item_image}/>
                    </li>
                ))}
                
            </ul>
                       
        </div>
     );
}
 
export default LandingPage;