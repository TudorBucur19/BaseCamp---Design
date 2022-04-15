import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdOutlineEditNote, MdDeleteSweep } from 'react-icons/md';

import { ratingCalculator } from 'utils/helperFunctions/helperFunctions';
import { deleteCampDialogTextContent } from 'utils/configValues';
import { AuthenticationContext } from 'contexts/AuthenticationContext';
import { CampgroundsContext } from 'contexts/CampgroundsContext';
import InfoAccordion from 'components/Common/InfoAccordion';
import DialogBox from 'components/Common/DialogBox';
import StarRating from 'components/Common/StarRating';
import WrappedPage from 'components/HOC/WrapedPage/WrappedPage';
import PageContainer from 'components/Common/PageContainer/PageContainer';
import CustomIcon from 'components/Common/CustomIcon/CustomIcon';
import CampgroundBanner from 'components/CampgroundBanner/CampgroundBanner';
import CampCard from 'components/CampCard/CampCard';
import PageSectionWrapper from 'components/Common/PageSectionWrapper/PageSectionWrapper';
import style from 'pages/ShowCampground/ShowCampground.module.scss';
import Comments from 'components/Common/Comments/Comments';
import CampDetails from 'components/Campground/CampDetails/CampDetails';

const ShowCampground = () => {
    const { campgroundsList, removeDBItem } = useContext(CampgroundsContext);
    const { user } = useContext(AuthenticationContext);
    const { id } = useParams(); 
    const [open, setOpen] = useState(false);
    const camp = campgroundsList && campgroundsList.find(campground => campground.id === id);
    const comments = camp && camp.comments;
    const image = camp && camp.campground.image;
    const campgroundOwnership = camp && user && camp.campground.author === user.displayName;
    const ratingOwnership = camp?.ratings && camp.ratings.filter(rating => rating.owner === user.uid).length;
    const overAllRating = camp?.ratings && ratingCalculator(camp.ratings);

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
        details,
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
                <div className={details}>
                    <CampDetails camp={camp}/>
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
            <DialogBox 
            {...{open, handleClose, image}} 
            onAgree={removeDBItem} 
            identifier={id} 
            dialogTextContent={deleteCampDialogTextContent}
            />  
        </PageContainer>   
        </>    
        }  
        </>           
     );
};
 
export default WrappedPage(ShowCampground);