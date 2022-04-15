import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineEditNote, MdDeleteSweep } from 'react-icons/md';

import { AuthenticationContext } from 'contexts/AuthenticationContext';
import { CampgroundsContext } from 'contexts/CampgroundsContext';
import InfoAccordion from 'components/Common/InfoAccordion';
import CustomIcon from 'components/Common/CustomIcon/CustomIcon';
import style from 'components/Campground/CampExtraDetails/CampExtraDetails.module.scss';

const CampExtraDetails = ({ camp, id, openDialog }) => {
    const { user } = useContext(AuthenticationContext);
    const campgroundOwnership = camp && user && camp.campground.author === user.displayName;
    const ratingOwnership = camp?.ratings && camp.ratings.filter(rating => rating.owner === user.uid).length;
    
    const handleClickOpen = () => {
        openDialog(true);
    };
        
    const { campExtraDetails, campExtraDetails_buttons } = style;
    return ( 
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
     );
}
 
export default CampExtraDetails;