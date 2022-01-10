import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { urlObjectKeys } from 'next/dist/shared/lib/utils';
import { resultImages } from "../data";
import styled from "styled-components";

function Map({ searchResults, result, hotels, loading }) {
  const [coordinateArr, setCoordinateArr] = useState([]);
  const [centerobj, setCenterObj] = useState({});
  const [viewport, setViewport] = useState({});
  const [selectedLocation, setSelectedLocation] = useState({});

  //Transform searchResults into geolib center obj
  // const coordinates = searchResults.map((result) => ({
  //     latitude: result.lat,
  //     longitude: result.long
  // }))


  // const center = getCenter(coordinateArr);

  // const [viewport, setViewport] = useState({
  //     width: '100%',
  //     height: '100%',
  //     latitude: centerobj.latitude,
  //     longitude: centerobj.longitude,
  //     zoom: 11
  // });

  useEffect(() => {
    setSelectedLocation(result);
  }, [result])

  useEffect(() => {
    if (!loading) {
      if (hotels.length > 0) {
        const coordinates = hotels.map((result) => ({
          latitude: result.latitude,
          longitude: result.longitude
        }))
        setCoordinateArr(coordinates);
      } else {
        const coordinates = searchResults.map((result) => ({
          latitude: result.lat,
          longitude: result.long
        }))
        setCoordinateArr(coordinates);
      }
    }

  }, [loading])

  useEffect(() => {
    const center = getCenter(coordinateArr);
    setCenterObj(center);
  }, [coordinateArr])

  useEffect(() => {
    setViewport({
      width: '100%',
      height: '100%',
      latitude: centerobj.latitude,
      longitude: centerobj.longitude,
      zoom: 11
    })
  }, [centerobj])


  return (

    <ReactMapGL
      mapStyle="mapbox://styles/s-paul/ckxrr83jv0m0614qu6c6rt6r8"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <MapContainer>
        {(hotels.length > 0) ?
          <>{
            hotels.map((res, index) => (
              <div key={res.long}>
                <Marker longitude={res.longitude} latitude={res.latitude} offsetLeft={-20} offsetTop={-10} style={{ zIndex: "-1" }}>
                  <p className='cursor-pointer text-sm text-red-400 font-bold animate-bounce' style={{ zIndex: "-1" }} onClick={() => setSelectedLocation(res)}>
                    <LocationMarkerIcon style={{ color: "#FD5B61", height: "30px" }} className='text-sm' />Hotel
                  </p>
                </Marker>
                {selectedLocation.longitude === res.longitude ?
                  <Popup tipSize={5} anchor="top" closeOnClick={true} onClose={() => setSelectedLocation({})} latitude={res.latitude} longitude={res.longitude} style={{ backgroundColor: "black" }}>
                    {/* <div style={{backgroundImage : "url('" + res.img + "')" ,margin:"0px", padding:"0px", height:"144px",width:"200px", backgroundSize:"cover", color:"white",fontWeight:"bold", padding:"10px"}}>
                                    <h5>{res.title}</h5>
                                    <h4>{res.price}</h4>
                                </div> */}
                    <PopupInner bg={res.max_1440_photo_url}>
                      <h5 className='text-white font-bold'>{res.hotel_name}</h5>
                      {/* <h4 className='text-white font-bold'>{res.price}</h4> */}
                    </PopupInner>
                  </Popup> : (false)}
              </div>
            ))}
          </> :
          <>
            {searchResults.map((res, index) => (
              <div key={res.long}>
                <Marker longitude={res.long} latitude={res.lat} offsetLeft={-20} offsetTop={-10} style={{ zIndex: "-1" }}>
                  <p className='cursor-pointer text-sm text-red-400 font-bold animate-bounce' style={{ zIndex: "-1" }} onClick={() => setSelectedLocation(res)}>
                    <LocationMarkerIcon style={{ color: "#FD5B61", height: "30px" }} className='text-sm' />Hotel
                  </p>
                </Marker>
                {selectedLocation.long === res.long ?
                  <Popup tipSize={5} anchor="top" closeOnClick={true} onClose={() => setSelectedLocation({})} latitude={res.lat} longitude={res.long} style={{ backgroundColor: "black" }}>
                    {/* <div style={{backgroundImage : "url('" + res.img + "')" ,margin:"0px", padding:"0px", height:"144px",width:"200px", backgroundSize:"cover", color:"white",fontWeight:"bold", padding:"10px"}}>
                                    <h5>{res.title}</h5>
                                    <h4>{res.price}</h4>
                                </div> */}
                    <PopupInner bg={res.img}>
                      <h5 className='text-white font-bold'>{res.title}</h5>
                      <h4 className='text-white font-bold'>{res.price}</h4>
                    </PopupInner>
                  </Popup> : (false)}
              </div>
            ))
            }</>
        }
      </MapContainer>
    </ReactMapGL>

  )
}

export default Map
const MapContainer = styled.div`
  width: 100%;
  height: 99vh;
  z-index: 1;
  margin-bottom: -35vh;
  background: var(--gray);
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, var(--light) 30%, transparent);
    z-index: 3;
    height: 20vh;
    pointer-events: none;
  
  }
  .mapMarker {
    position: relative;
    animation: markerAnim 0.5s infinite ease-out alternate;
    &.active {
      animation-play-state: paused;
      &::before {
        animation-play-state: paused;
      }
    }
    &::before {
      content: "";
      position: absolute;
      width: 1rem;
      height: 0.25rem;
      background: var(--dark);
      transform-origin: bottom center;
      filter: blur(2px);
      border-radius: 100%;
      bottom: 0.125rem;
      left: 0.25rem;
      z-index: -1;
      opacity: 0.5;
      animation: markerShadowAnim 0.5s infinite ease-out alternate;
    }
  }
  @keyframes markerAnim {
    to {
      transform: translateY(-0.5rem);
    }
  }
  @keyframes markerShadowAnim {
    to {
      transform: translateY(0.5rem) scale(0.25);
      opacity: 1;
    }
  }
  .mapPin {
    stroke: none;
    fill: var(--red);
    circle {
      fill: var(--gray);
    }
  }
  .mapboxgl-popup {
    z-index: 1;
  }
  .mapboxgl-popup-content {
    border-radius: 1rem;
    padding: 0;
    max-width: 240px;
    width: 75%;
    background: gray;
    
  }
  .mapboxgl-popup-close-button {
    right: 0;
    top: 0;
    color: white;
    line-height: 1;
    z-index: 98;
    background: #EF5350;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 0 1rem 0 1rem;
    box-shadow: -0.5rem 0.5rem 0.5rem #0002;
  }
  .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
    border-bottom-color: var(--dark);
  }
  .mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {
    border-bottom-color: var(--dark);
  }
  .mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
    border-bottom-color: var(--dark);
  }
  .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
    border-top-color: var(--dark);
  }
  .mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {
    border-bottom: none;
    border-left: none;
    border-top-color: var(--dark);
  }
  .mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
    border-top-color: var(--dark);
  }
  .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    border-right-color: var(--dark);
  }
  .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
    border-left-color: var(--dark);
  }
  @media (min-width: 48rem) {
    margin-bottom: -50vh;
    height: calc(100vh + 10rem);
    .mapboxgl-popup-content {
      width: 360px;
    }
  }
`;

const PopupInner = styled.div`
  background: linear-gradient(to top, black, transparent), ${props => `url(${props.bg}) no-repeat top center`};
  background-size: cover;
  padding: 5rem 1rem 0.5rem;
  box-shadow: 0 0.25rem 0.5rem #0002;
  border-radius: 1rem;
  color: var(--white);
`;
