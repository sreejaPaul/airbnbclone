import React , {useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';


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
                            <p className='cursor-pointer text-2xl animate-bounce' onClick={()=>setSelectedLocation(res)}>
                                <svg className="w-6 h-6" fill="#FE595E" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
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
