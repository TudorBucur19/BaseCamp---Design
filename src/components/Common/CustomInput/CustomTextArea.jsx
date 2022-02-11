import React from 'react';
import style from 'components/Common/CustomInput/CustomTextArea.module.scss';

const CustomTextArea = ({ name, label, register, rows="3" }) => {
    const {customField, placeholder} = style;

    return ( 
        <label className={customField}>
            <textarea rows={rows} {...register(name, {required: true})} required/>
            <span className={placeholder}>{label}</span>
        </label>
     );
}
 
export default CustomTextArea;