import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CampgroundsContext } from 'contexts/CampgroundsContext';
import CampgroundForm from 'components/forms/CampgroundForm/CampgroundForm';
import WrappedPage from 'components/HOC/WrapedPage/WrappedPage';


const AddNewCampground = ({ currentCamp }) => {
    const { campground, setCampground, setIsEditMode } = useContext(CampgroundsContext);
    const { setValue } = useForm();

    useEffect(() => {
        setIsEditMode(false);
    }, []);
    
    useEffect(() => {
        if(currentCamp) {
        const { name, price, description, image, coords, contactInfo } = currentCamp.campground;
        setValue('name', name);
        setValue('price', price);
        setValue('description', description);
        setValue('contactInfo.phoneNumber', contactInfo.phoneNumber);
        setValue('contactInfo.email', contactInfo.phoneNumber);
        setCampground({
            ...campground,
            image: image,
            coords: coords,
            })
        };
    }, []);

    return (
        <div> 
            <CampgroundForm actionName="Submit"/>
        </div>
     );
}
 
export default WrappedPage(AddNewCampground);