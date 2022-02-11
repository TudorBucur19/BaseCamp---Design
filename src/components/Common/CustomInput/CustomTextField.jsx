import React from 'react';
import style from 'components/Common/CustomInput/CustomTextField.module.scss';

const CustomTextField = ({ type, name, label, register }) => {
    const {customField, placeholder} = style;

    return ( 
        <label className={customField}>
            <input type={type} {...register(name, {required: true})} required/>
            <span className={placeholder}>{label}</span>
        </label>
     );
}
 
export default CustomTextField;