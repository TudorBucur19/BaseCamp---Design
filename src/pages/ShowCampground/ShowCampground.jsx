import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdOutlineBed, MdOutlineMap, MdOutlineEditNote, MdDeleteSweep } from 'react-icons/md';
import { accomodationType } from 'utils/configValues';
import CardMedia from '@mui/material/CardMedia';

import { ratingCalculator } from 'utils/helperFunctions/helperFunctions';
import { campgroundFacilities } from 'utils/configValues';
import { AuthenticationContext } from 'contexts/AuthenticationContext';
import { CampgroundsContext } from 'contexts/CampgroundsContext';
import missingImage from 'assets/image-not-found.jpg';
import InfoAccordion from 'components/Common/InfoAccordion';
import DialogBox from 'components/Common/DialogBox';
import StarRating from 'components/Common/StarRating';
import ImageCarousel from 'components/ImageCarousel/ImageCarousel';
import WrappedPage from 'components/HOC/WrapedPage/WrappedPage';
import PageContainer from 'components/Common/PageContainer/PageContainer';
import CustomIcon from 'components/Common/CustomIcon/CustomIcon';
import CampgroundBanner from 'components/CampgroundBanner/CampgroundBanner';
import CampCard from 'components/CampCard/CampCard';
import PageSectionWrapper from 'components/Common/PageSectionWrapper/PageSectionWrapper';
import style from 'pages/ShowCampground/ShowCampground.module.scss';
import Comments from 'components/Common/Comments/Comments';

const ShowCampground = () => {
    const { campgroundsList, removeDBItem } = useContext(CampgroundsContext);
    const { user } = useContext(AuthenticationContext);
    const { id } = useParams(); 
    const [open, setOpen] = useState(false);
    const camp = campgroundsList && campgroundsList.find(campground => campground.id === id);
    const comments = camp && camp.comments;
    const facilities = camp && camp.campground.facilities;
    const accomodationOptions = camp && camp.campground.accomodationOptions;
    const image = camp && camp.campground.image;
    const campgroundOwnership = camp && user && camp.campground.author === user.displayName;
    const ratingOwnership = camp?.ratings && camp.ratings.filter(rating => rating.owner === user.uid).length;
    const overAllRating = camp?.ratings && ratingCalculator(camp.ratings);
    const currentFacilities = facilities && campgroundFacilities.filter(item => facilities.includes(item.name));
    const currentAccOptions = accomodationOptions && accomodationType.filter(item => accomodationOptions.includes(item.name))
    const dialogTextContent = {
        deleteCampMsg: "You are about to remove this campground and it's data. Are you sure?",
        campHeader: "Remove this Campground?"
    }

    const getSimilarItems = (property) => {
        return campgroundsList.filter(item => item.campground.landscape === property && item.id !== camp.id).slice(0, 3);
    };

    //filters the campgrounsd with same landscape
    const sameLandscape = camp && getSimilarItems(camp.campground.landscape);

    
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const { 
        container, 
        campTitle, 
        campTitle_name, 
        campTitle_rating, 
        campTitle_rating_landscape, 
        campDetails, 
        campDetails_features,
        campDetails_features_item,
        campDetails_features_item_icons,
        campDetails_features_item_text,
        campDetails_facilities_items,
        campExtraDetails,
        campExtraDetails_buttons,
        similarItems_items
    } = style;
      
    return ( 
        <>
        {camp &&
        <>
        <CampgroundBanner price={camp.campground.price} similarOptions={sameLandscape}/>
        <PageContainer>             
            <div className={container}>                
                <div className={campTitle}>
                    <h1 className={campTitle_name}>{camp.campground.name}</h1>
                    <div className={campTitle_rating}>
                        <h2 className={campTitle_rating_landscape}>{camp.campground.landscape}</h2>
                        {overAllRating && <StarRating readOnly={true} ratingValue={overAllRating}/>}
                    </div>
                </div>
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

                    <PageSectionWrapper title="comments" id="comments">
                        {comments && comments.length > 0 &&
                            <Comments {...{comments, id}}/>
                        }
                    </PageSectionWrapper>                  
                </div>
                <div className={campExtraDetails}>
                    <InfoAccordion campground={camp} campId={id} ratingOwnership={ratingOwnership} user={user}/>
                    {campgroundOwnership &&
                    <div className={campExtraDetails_buttons}>       
                        <Link to={`/campgrounds/${id}/editcampground`}>                                             
                            <CustomIcon icon={<MdOutlineEditNote/>} size="large" isButton={true}/>
                        </Link>
                    
                        <CustomIcon icon={<MdDeleteSweep/>} size="large" color="danger" isButton={true} onClick={handleClickOpen}/>    
                    </div>
                    }
                </div>
            </div>  
            
            {sameLandscape.length > 0 &&
            <PageSectionWrapper title="similar campgrounds" id="otherOptions">
                <div className={similarItems_items}>
                    {sameLandscape && sameLandscape.map(item => (
                        <CampCard key={item.id} campground={item} url="/campgrounds"/>
                    ))}
                </div>  
            </PageSectionWrapper>   
            }          
            <DialogBox {...{open, handleClose, dialogTextContent, image}} onAgree={removeDBItem} identifier={id}/>  
        </PageContainer>   
        </>    
        }  
        </>           
     );
};
 
export default WrappedPage(ShowCampground);