import React from 'react';

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
                        <a href="#description">
                            Description
                        </a>
                    </li>
                    <li>
                        <a href="#facilities">
                            Facilities
                        </a>
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