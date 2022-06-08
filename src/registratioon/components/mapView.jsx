import { Wrapper } from '@googlemaps/react-wrapper';
import React from 'react';
import { useState, useEffect } from "react";
import { getAllPosts } from '../integration/isapp-service';
import Map from './post/Map';
import MapRef from './post/MapRef';
import Marker from './post/Marker';

export default function MapView() {
    const [locations, setLocations] = React.useState([]);
    const [zoom, setZoom] = React.useState(12); // initial zoom
    const [center, setCenter] = React.useState({
        lat: 44.437108986119014,
        lng: 26.101442173447456,
    });

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            await getAllPosts().then(response => {               
                    setLocations(response.data.map(post => ({
                        lat: post.lat,
                        lng: post.lng
                    })));
            });
        }
        
        getData();

    }, [])

    const render = (status) => {
        return <h1>{status}</h1>;
    }

 

    return (
        <div style={{ textAlign: '-webkit-center' }}>

            <div style={{ display: "flex", height: "400px", width: "100%" }}>
                <Wrapper apiKey={"AIzaSyCCuP8HpKJbPtcbaiHuVRpEZ-g3mB3-eBk"} render={render}>
                    <MapRef
                        center={center}
                        // onClick={onClick}
                        // onIdle={onIdle}
                        zoom={zoom}
                        style={{ flexGrow: "1", height: "400px", width: "500px" }}
                    >
                        {locations.map((latLng, i) => (
                            <Marker key={i} position={latLng} >
                            </Marker>
                        ))}
                    </MapRef>
                </Wrapper>


            </div>
        </div>)
}
