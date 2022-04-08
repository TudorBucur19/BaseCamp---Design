import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapBanner = ({ height, width, campsList, currentPosition }) => {
    const mapStyle = {
        height: height,
        width: width
    };

    const defaultCenter = {
        lat: 45.745,
        lng: 25.200
    };

    return ( 
        <div>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                mapContainerStyle={mapStyle}
                center={currentPosition ? currentPosition : defaultCenter}
                zoom={5}
                >
                    {campsList.map((item, index) => 
                        <Marker
                        key={index}
                        position={item.campground.coords}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
     );
}
 
export default MapBanner;