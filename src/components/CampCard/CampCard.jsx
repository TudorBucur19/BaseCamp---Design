import React from 'react';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MdArrowForwardIos } from 'react-icons/md';

import StarRating from 'components/Common/StarRating';
import Button from 'components/Common/Button/Button';
import { ratingCalculator } from 'utils/helperFunctions/helperFunctions';
import { locationAccess, campgroundFacilities } from 'utils/configValues';
import missingImage from 'assets/image-not-found.jpg';
import styles from 'components/CampCard/CampCard.module.scss';

const CampCard = ({ campground, url }) => {
    const { image, name, price, country, landscape, access, facilities, description } = campground.campground;
    const overAllRating = ratingCalculator(campground.ratings);
    const currentCampAccess = access && locationAccess.filter(item => access.includes(item.name));
    const currentCampFacilities = facilities && campgroundFacilities.filter(item => facilities.includes(item.name));
    const displayFacilities = currentCampFacilities.slice(0, 4);
    const displayDescriprtion = description.length > 100 ? `${description.substring(0, 100)}...` : description;
    console.log(displayFacilities);
    const displayPrice = price > 0 ? `Price from ${price} €` : 'Free Accomodation';

    const {
        card, 
        card_cover, 
        card_cover_image, 
        card_cover_info, 
        card_cover_info_text,
        card_details, 
        card_details_title, 
        card_details_access, 
        card_details_access_icons, 
        card_details_description,
        card_details_description_text,
        card_details_footer,       
        card_details_footer_icons, 
    } = styles;

    return ( 
        <div className={card}>
            <figure className={card_cover}>
                <img className={card_cover_image} src={image ? image[0].url : missingImage} alt="card cover" />
                <div class={card_cover_info}>
                    {landscape && <h3 className={card_cover_info_text}>{landscape}</h3>}
                    <StarRating readOnly={true} ratingValue={overAllRating}/>
                </div>
            </figure>
            <div className={card_details}>
                <h1 className={card_details_title}>{name}</h1>
                <div className={card_details_access}>
                    <div className={card_details_access_icons}>
                        {currentCampAccess?.map(item => (
                            <item.icon color="borders"/>
                        ))}
                    </div>

                    {country &&
                        <ReactCountryFlag 
                        countryCode={country.code} 
                        svg 
                        style={{
                            fontSize: '1.5em',
                        }}
                        title={country.name}
                        />
                    }
                </div>
                <div className={card_details_description}>
                    <p className={card_details_description_text}>{displayDescriprtion}</p>
                </div>
                <Button label={displayPrice} variant="outlined"/>

                <div className={card_details_footer}>
                    <div className={card_details_footer_icons}>
                        {displayFacilities.map(item => (
                            <item.icon color="#66666680" size="1.6em"/>
                        ))}
                    </div>
                    <Button label="Full Info" icon={<MdArrowForwardIos/>}/>
            </div>
            </div>
        </div>
     );
}
 
export default CampCard;