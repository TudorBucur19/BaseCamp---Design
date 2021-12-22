import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import CabinIcon from '@mui/icons-material/Cabin';

const MapBanner = ({ height, width, onClick, campsList, icon }) => {
    const mapStyle = {
        height: height,
        width: width
    };

    const defaultCenter = {
        lat: 45.745,
        lng: 25.200
    };

    return ( 
        <Box>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                mapContainerStyle={mapStyle}
                center={defaultCenter}
                zoom={10}
                onClick={(e) => onClick(e)}
                >
                    {campsList.map((item, index) => 
                        <Marker
                        key={index}
                        position={item.campground.coords}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </Box>
     );
}
 
export default MapBanner;