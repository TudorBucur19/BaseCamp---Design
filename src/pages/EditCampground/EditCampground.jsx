import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { CampgroundsContext } from 'contexts/CampgroundsContext';
import CampgroundForm from 'components/forms/CampgroundForm/CampgroundForm';
import WrappedPage from 'components/HOC/WrapedPage/WrappedPage';

const EditCampground = () => {
    const { campgroundsList, setIsEditMode, setCurrentID } = useContext(CampgroundsContext);
    const { id } = useParams();
    const camp = campgroundsList && campgroundsList.find(campground => campground.id === id);
    
    useEffect(() => {
        setCurrentID(id);
        setIsEditMode(true);
    }, []);
    
    return ( 
        <div> 
            <CampgroundForm currentCamp={camp} actionName="Update" formTitle={`Edit ${camp?.campground.name}`}/>
        </div>
     );
}
 
export default WrappedPage(EditCampground);