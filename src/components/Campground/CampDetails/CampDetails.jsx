import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import { MdOutlineBed, MdOutlineMap } from 'react-icons/md';

import missingImage from 'assets/image-not-found.jpg';
import { campgroundFacilities, accomodationType } from 'utils/configValues';
import PageSectionWrapper from 'components/Common/PageSectionWrapper/PageSectionWrapper';
import ImageCarousel from 'components/ImageCarousel/ImageCarousel';
import CustomIcon from 'components/Common/CustomIcon/CustomIcon';
import style from 'components/Campground/CampDetails/CampDetails.module.scss';

const CampDetails = ({ camp}) => {
    const facilities = camp && camp.campground.facilities;
    const accomodationOptions = camp && camp.campground.accomodationOptions;
    const image = camp && camp.campground.image;
    const currentFacilities = facilities && campgroundFacilities.filter(item => facilities.includes(item.name));
    const currentAccOptions = accomodationOptions && accomodationType.filter(item => accomodationOptions.includes(item.name))
    const {
        campDetails, 
        campDetails_features,
        campDetails_features_item,
        campDetails_features_item_icons,
        campDetails_features_item_text,
        campDetails_facilities_items,
    } = style;

    return ( 
        <div className={campDetails}>
            {image.length ? 
            <ImageCarousel images={image} />           
            :
            <CardMedia
            component="img"
            image={missingImage}
            alt="missing image"
            />    
            }
            <div className={campDetails_features}>
                <div className={campDetails_features_item}>
                    <CustomIcon icon={<MdOutlineMap/>} size="large"/>
                    <p className={campDetails_features_item_text}>
                        {`${camp.campground.country.localSpot}, ${camp.campground.country.name}`}
                    </p>
                </div>
                {currentAccOptions &&
                <div className={campDetails_features_item}>
                    <span className={campDetails_features_item_icons}>
                        {currentAccOptions.map(item => (<CustomIcon icon={<item.icon/>} size="large"/>))}
                    </span>
                    <p className={campDetails_features_item_text}>Accomodation Options</p>
                </div>
                }
                <div className={campDetails_features_item}>
                <CustomIcon icon={<MdOutlineBed/>} size="large"/>
                    <p className={campDetails_features_item_text}>{`${camp.campground.price} € / night`}</p>
                </div>
            </div>
            <PageSectionWrapper id="description">
                {camp.campground.description}
            </PageSectionWrapper>
            <PageSectionWrapper title="campground facilities" id="facilities">
                <div className={campDetails_facilities_items}>
                {currentFacilities && currentFacilities.map(item => (
                    <CustomIcon label={item.name} icon={<item.icon/>}/>
                ))}
                </div>                        
            </PageSectionWrapper>               
        </div>
     );
}
 
export default CampDetails;