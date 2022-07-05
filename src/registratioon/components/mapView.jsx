import { Wrapper } from '@googlemaps/react-wrapper';
// import { InfoWindow } from 'google-maps-react';
import React from 'react';
import { useState, useEffect } from "react";
import { getAllPosts } from '../integration/isapp-service';
import Map from './post/Map';
import MapRef from './post/MapRef';
// import Marker from './post/Marker';
import { Marker, InfoWindow } from "@react-google-maps/api";
import RecipeReviewCard from './Card/RecipeReviewCard';
import "./mapView.css"
import { Button } from '@material-ui/core';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export default function MapView() {
    const [locations, setLocations] = React.useState([]);
    const [zoom, setZoom] = React.useState(12); // initial zoom
    const [center, setCenter] = React.useState({
        lat: 44.437108986119014,
        lng: 26.101442173447456,
    });
    const [showInfo, setShowInfo] = useState(false);
    const [showInfoId, setShowInfoId] = useState(false);

    const [posts, setPosts] = useState([]);

    const history = useHistory();
    useEffect(() => {
        const getData = async () => {
            const response = await getAllPosts();
            setPosts(response.data)

            // then(response => {

            //     setLocations(response.data.map(post => ({
            //         lat: post.lat,
            //         lng: post.lng,
            //     })));
            // });
        }

        getData();

    }, [])

    const render = (status) => {
        return <h1>{status}</h1>;
    }

    const markerClicked = (i) => {
        console.log("cliiiick")
        setShowInfo(true)
        setShowInfoId(i)
    }
    const onInfoWindowClose = () => {
        setShowInfo(false)

    }
    return (
        <div style={{ textAlign: '-webkit-center' }}>
            <div style={{ display: "flex", marginBottom: "10px" }}>
                <Button onClick={() => {
                    history.push({
                        pathname: "/"
                    })
                }} color="primary" variant="contained">
                    <FaArrowCircleLeft style={{ marginRight: "10px" }}> </FaArrowCircleLeft>Go back to properties</Button>
            </div>
            <div style={{ display: "flex", height: "900px", width: "100%" }}>
                <Wrapper apiKey={"AIzaSyCCuP8HpKJbPtcbaiHuVRpEZ-g3mB3-eBk"} render={render}>
                    <MapRef
                        center={center}
                        // onClick={()=>console.log("click maaap")}
                        // onIdle={onIdle}
                        zoom={zoom}
                        style={{ flexGrow: "1", height: "900px", width: "500px" }}
                    >
                        {posts.map((post, i) => (
                            <Marker style={{ maxHeight: "1000px !important" }} key={i} position={{ lat: post.lat, lng: post.lng }} onClick={() => markerClicked(i)}>
                                {showInfoId === i && (
                                    <InfoWindow
                                        style={{ maxHeight: "1000px !important" }}
                                        position={{ lat: post.lat, lng: post.lng }}
                                        onCloseClick={onInfoWindowClose}
                                    >
                                        <RecipeReviewCard style={{ maxHeight: "1000px !important" }} idPost={post.postId}></RecipeReviewCard>
                                        {/* <div>
                                            <p>hello</p>
                                        </div> */}
                                    </InfoWindow>
                                )}
                            </Marker>
                        ))}
                    </MapRef>
                </Wrapper>


            </div>
        </div>)
}
