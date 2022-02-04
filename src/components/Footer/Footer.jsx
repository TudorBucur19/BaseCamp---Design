import React from 'react';
import style from 'components/Footer/Footer.module.scss';

const Footer = () => {
    const { footer, footer_socialMedia, footer_copyright } = style;
    return ( 
        <footer className={footer}>
            <div className={footer_socialMedia}>SOCIAL MEDIA LINKS</div>
            <p className={footer_copyright}>COPYRIGHT BASECAMP 2022</p>
        </footer>
     );
}
 
export default Footer;