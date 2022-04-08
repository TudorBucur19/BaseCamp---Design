import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdOutlineBed, MdOutlineMap, MdOutlineEditNote, MdDeleteSweep } from 'react-icons/md';
import { accomodationType } from 'utils/configValues';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Container } from '@mui/material';

import { ratingCalculator } from 'utils/helperFunctions/helperFunctions';
import { AuthenticationContext } from 'contexts/AuthenticationContext';
import { CampgroundsContext } from 'contexts/CampgroundsContext';
import InfoAccordion from 'components/Common/InfoAccordion';
import CommentItem from 'components/Common/CommentItem';
import CommentForm from 'components/forms/CommentForm';
import DialogBox from 'components/Common/DialogBox';
import StarRating from 'components/Common/StarRating';
import ImageCarousel from 'components/ImageCarousel/ImageCarousel';
import WrappedPage from 'components/HOC/WrapedPage/WrappedPage';
import { campgroundFacilities } from 'utils/configValues';
import missingImage from 'assets/image-not-found.jpg';
import PageContainer from 'components/Common/PageContainer/PageContainer';
import style from 'pages/ShowCampground/ShowCampground.module.scss';
import CustomIcon from 'components/Common/CustomIcon/CustomIcon';
import CampgroundBanner from 'components/CampgroundBanner/CampgroundBanner';
import CampCard from 'components/CampCard/CampCard';
import PageSectionWrapper from 'components/Common/PageSectionWrapper/PageSectionWrapper';
import Button from 'components/Common/Button/Button';

const ShowCampground = () => {
    const { campgroundsList, handleCommentsUpdate, removeDBItem } = useContext(CampgroundsContext);
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
        return campgroundsList.filter(item => item.campground.landscape === property && item.id !== camp.id)
    };

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
        campDetails_description,
        campDetails_facilities,
        campDetails_facilities_title,
        campDetails_facilities_items,
        campExtraDetails,
        campExtraDetails_buttons,
        campExtraDetails_buttons_button,
        similarItems,
        similarItems_title,
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
                    
                    {comments && comments.length > 0 &&
                        <PageSectionWrapper title="comments" id="discussions">
                            <Paper sx={{mt: 2, p: 2, display: "flex", flexDirection: "column"}} >
                                {comments.map((comment, index) => 
                                    <CommentItem 
                                    key={index}
                                    comment={comment}
                                    removeComment={handleCommentsUpdate}
                                    campgroundID = {id}
                                    />
                                )}
                            </Paper>
                        </PageSectionWrapper>
                    }
                    {user &&
                    <PageSectionWrapper>
                        <CommentForm campID={id}/>
                    </PageSectionWrapper>
                    }
                </div>
                <div className={campExtraDetails}>
                    <InfoAccordion campground={camp} campId={id} ratingOwnership={ratingOwnership} user={user}/>
                    <div className={campExtraDetails_buttons}>       
                        <Link to={`/campgrounds/${id}/editcampground`}>                                             
                            <CustomIcon icon={<MdOutlineEditNote/>} size="large" isButton={true}/>
                        </Link>
                    
                        <CustomIcon icon={<MdDeleteSweep/>} size="large" color="danger" isButton={true} onClick={handleClickOpen}/>
                        
                    </div>
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