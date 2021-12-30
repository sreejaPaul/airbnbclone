import React , {useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';
import {LocationMarkerIcon} from '@heroicons/react/solid';

function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({});

    //Transform searchResults into geolib center obj
    const coordinates = searchResults.map((result)=>({
        latitude: result.lat,
        longitude: result.long 
    }))
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });
    
    return (
        <ReactMapGL 
        mapStyle="mapbox://styles/s-paul/ckxrr83jv0m0614qu6c6rt6r8"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(viewport) => setViewport(viewport)}
        >
            {
                searchResults.map((res)=>(
                    <div key={res.long}>
                        <Marker longitude={res.long} latitude={res.lat} offsetLeft={-20} offsetTop={-10}>
                            <p className='cursor-pointer text-sm text-red-400 font-bold animate-bounce' onClick={()=>setSelectedLocation(res)}>
                                <LocationMarkerIcon style={{color:"#FD5B61", height:"30px"}} className='text-sm'/>Hotel
                            </p>
                        </Marker>
                        {selectedLocation.long === res.long ? <Popup closeOnClick={true} onClose={()=>setSelectedLocation({})} latitude ={res.lat} longitude={res.long}> {res.title} </Popup>: (false) }
                    </div>
                ))
            }
        </ReactMapGL>
    )
}

export default Map
