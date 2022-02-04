import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CampgroundsContext } from 'contexts/CampgroundsContext';
import CampgroundForm from 'components/forms/CampgroundForm';


const AddNewCampground = ({ currentCamp }) => {
    const { campground, setCampground, setIsEditMode } = useContext(CampgroundsContext);
    const { setValue } = useForm();

    useEffect(() => {
        setIsEditMode(false);
    }, []);
    
    useEffect(() => {
        if(currentCamp) {
        const { name, price, description, image, coords } = currentCamp.campground;
        setValue('name', name);
        setValue('price', price);
        setValue('description', description);
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
 
export default AddNewCampground;