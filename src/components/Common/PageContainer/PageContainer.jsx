import React from 'react';

import style from 'components/Common/PageContainer/PageContainer.module.scss';

const PageContainer = ({children}) => {
    const { contentContainer } = style;
    
    return ( 
        <div className={contentContainer}>
            {children}
        </div>
     );
}
 
export default PageContainer;