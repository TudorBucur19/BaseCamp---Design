import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { CampgroundsContext } from 'contexts/CampgroundsContext';
import CampCard from 'components/CampCard/CampCard';
import HeaderStripe from 'components/Common/HeaderStripe/HeaderStripe';
import MapBanner from 'components/MapBanner/MapBanner';
import WrappedPage from 'components/HOC/WrapedPage/WrappedPage';
import SearchResultsMessage from 'components/Common/SearchResultsMessage';
import PageContainer from 'components/Common/PageContainer/PageContainer';
import styles  from 'pages/Campgrounds/Campgrounds.module.scss';

const Campgrounds = () => {
    const { campgroundsList, currentPosition, searchWord } = useContext(CampgroundsContext);
    const { url } = useRouteMatch();    

    const foundResults = campgroundsList && campgroundsList.filter(
        result => result.campground.name.toLowerCase().includes(searchWord.searchWord.toLowerCase())
    );

    const { listGrid } = styles;
    
    return ( 
        <>
            <MapBanner 
                width="100%" 
                height="400px"
                campsList={campgroundsList}  
                {...{currentPosition}}
                />
            <PageContainer>
                <HeaderStripe title="campgrounds" subtitle="choose the best"/>
                {foundResults.length ?
                <div className={listGrid}>
                    {foundResults &&
                        foundResults.map((campground) => 
                            <CampCard key={campground.id} {...{campground, url}}/>
                        )
                    }                    
                </div>
                :
                <Box>
                    {searchWord.searchWord.length ?
                    <SearchResultsMessage/>
                    :
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress color="secondary" />
                    </Box>
                    }
                </Box>
                }
            </PageContainer>  
        </>            
     );
}
 
export default WrappedPage(Campgrounds);