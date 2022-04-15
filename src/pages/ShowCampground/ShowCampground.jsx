import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ratingCalculator } from 'utils/helperFunctions/helperFunctions';
import { deleteCampDialogTextContent } from 'utils/configValues';
import { CampgroundsContext } from 'contexts/CampgroundsContext';
import { AuthenticationContext } from 'contexts/AuthenticationContext';
import DialogBox from 'components/Common/DialogBox';
import StarRating from 'components/Common/StarRating';
import WrappedPage from 'components/HOC/WrapedPage/WrappedPage';
import PageContainer from 'components/Common/PageContainer/PageContainer';
import CampgroundBanner from 'components/CampgroundBanner/CampgroundBanner';
import CampCard from 'components/CampCard/CampCard';
import PageSectionWrapper from 'components/Common/PageSectionWrapper/PageSectionWrapper';
import style from 'pages/ShowCampground/ShowCampground.module.scss';
import Comments from 'components/Common/Comments/Comments';
import CampDetails from 'components/Campground/CampDetails/CampDetails';
import CampExtraDetails from 'components/Campground/CampExtraDetails/CampExtraDetails';
import CommentForm from 'components/forms/CommentForm';

const ShowCampground = () => {
    const { campgroundsList, removeDBItem } = useContext(CampgroundsContext);
    const { user } = useContext(AuthenticationContext);
    const { id } = useParams(); 
    const [open, setOpen] = useState(false);
    const camp = campgroundsList && campgroundsList.find(campground => campground.id === id);
    const comments = camp && camp.comments;
    const image = camp && camp.campground.image;
    const overAllRating = camp?.ratings && ratingCalculator(camp.ratings);

    const getSimilarItems = (property) => {
        return campgroundsList.filter(item => item.campground.landscape === property && item.id !== camp.id).slice(0, 3);
    };

    //filters the campgrounsd with same landscape
    const sameLandscape = camp && getSimilarItems(camp.campground.landscape);
    
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
        extraDetails,
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

                    {comments && comments.length > 0 &&
                    <PageSectionWrapper title="comments" id="comments">                        
                        <Comments {...{comments, id}}/>                        
                    </PageSectionWrapper> 
                    }
                    {user &&
                    <CommentForm campID={id}/> 
                    } 
                </div>             

                <div className={extraDetails}>
                    <CampExtraDetails {...{camp, id}} openDialog={setOpen}/>
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