import React from 'react';
import { FaInstagram, FaFacebookSquare } from 'react-icons/fa'
import style from 'components/Footer/Footer.module.scss';
import CustomIcon from 'components/Common/CustomIcon/CustomIcon';

const Footer = () => {
    const { footer, footer_socialMedia, footer_copyright } = style;
    return ( 
        <footer className={footer}>
            <div className={footer_socialMedia}>
                <a href="#">
                    <CustomIcon icon={<FaInstagram/>} size="small" color="basic"/>
                </a>
                <a href="#">
                    <CustomIcon icon={<FaFacebookSquare/>} size="small" color="basic"/>
                </a>
            </div>
            <p className={footer_copyright}>COPYRIGHT BASECAMP 2022</p>
        </footer>
     );
}
 
export default Footer;