/* global google */

import React, { useEffect, useState } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapRef from './MapRef';
import Marker from './Marker';


const Map = ({parentCallBack}) => {

  const [clicks, setClicks] = React.useState([]);
  const [zoom, setZoom] = React.useState(12); // initial zoom
  const [center, setCenter] = React.useState({
    lat: 44.437108986119014,
    lng: 26.101442173447456,
  });

  const onClick = (e) => {
    parentCallBack(e.latLng.lat(), e.latLng.lng());
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m) => {
    console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  const render = (status) => {
    return <h1>{status}</h1>;
  }

  return (
    <div style={{ display: "flex", height: "525px", width: "800px" }}>
      <Wrapper apiKey={"AIzaSyCCuP8HpKJbPtcbaiHuVRpEZ-g3mB3-eBk"} render={render}>
        <MapRef
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "525px", width: "800px" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} >
            </Marker>
          ))}
        </MapRef>
      </Wrapper>
    </div>
  )

}

export default Map