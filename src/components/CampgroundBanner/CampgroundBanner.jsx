import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import nightCamp from 'assets/nightCamp.jpg';
import style from 'components/CampgroundBanner/CampgroundBanner.module.scss';

const CampgroundBanner = ({price}) => {
    const { 
        banner, 
        banner_image, 
        banner_overlay, 
        banner_menu, 
        banner_menu_items, 
        banner_menu_info, 
        banner_menu_info_price, 
        banner_menu_info_priceTag 
    } = style;

    return ( 
        <div className={banner}>
            <div className={banner_overlay}></div>
            <div className={banner_menu}> 
                <ul className={banner_menu_items}>
                    <li>
                        <AnchorLink href="#description">
                            Description
                        </AnchorLink>
                    </li>
                    <li>
                        <AnchorLink href="#facilities">
                            Facilities
                        </AnchorLink>
                    </li>
                    <li>Discussions</li>
                </ul>

                <div className={banner_menu_info}>
                    {price > 0 ?
                    <>
                    <div className={banner_menu_info_price}>{price}</div>
                    <div className={banner_menu_info_priceTag}>
                        <div>€</div>
                        <div>/ NIGHT</div>
                    </div>
                    </>
                    :
                    <div className={banner_menu_info_price}>free camping</div>
                    }
                </div>
            </div>
            <img className={banner_image} src={nightCamp} alt="negoiu peak" />
        </div>
     );
}
 
export default CampgroundBanner;