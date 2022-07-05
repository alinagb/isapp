/* global google */

import React, { useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { FaMapMarkerAlt, FaArrowCircleLeft, FaHeart, FaPhone } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import "./detailsPost.css"
import Chip from '@material-ui/core/Chip';
import { getPostById, getUserByEmail, getUsers, markPostAsFavourite } from '../../integration/isapp-service';
import { useParams } from 'react-router-dom';
import Geocode from "react-geocode";
import Carousel from './Carousel';
import AlertDialog from './PopupDialog';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyCCuP8HpKJbPtcbaiHuVRpEZ-g3mB3-eBk");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latitude & longitude.

export default function DetailsPost({ accessToken, userEmail }) {
    const history = useHistory();
    const { postId } = useParams();
    const [description, setDescription] = useState();
    const [mailPhoto, setMainPhoto] = useState();
    const [title, setTitle] = useState();
    const [owner, setOwner] = useState();
    const [otherResidences, setOtherResidences] = useState([]);
    const [nearBy, setNearBy] = useState([]);
    const [profilePhotoExist, setProfilePhotoExist] = useState([]);
    const [avatar, setAvatar] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [location, setLocation] = useState();
    const [noRooms, setNoRooms] = useState();

    const [isActive, setIsActive] = useState(false);

    const handleClick = async () => {

        await getUserByEmail(accessToken, userEmail).then(responseUser => {
            responseUser && markPostAsFavourite(accessToken, postId, responseUser.data.userId).then(response => {
                setIsActive(current => !current);

                console.log("response", response)
            })
        })
        // 👇️ toggle

        // 👇️ or set to true
        // setIsActive(true);
    };

    useEffect(() => {
        const getData = async () => {
            getPostById(postId).then(responsePost => {
                console.log("rrrr", responsePost)
                setTitle(responsePost.data.title)
                setDescription(responsePost.data.description)
                setOtherResidences(responsePost.data.userSet)
                setNearBy(responsePost.data.facultySet)
                setLat(responsePost.data.lat)
                setLng(responsePost.data.lng)
                setNoRooms(responsePost.data.noRooms)
                getUsers().then((responseUsers) => {
                    setOwner(responseUsers.data.filter(user => user.userId === responsePost.data.owner)[0])
                    setAvatar("http://localhost:8090/registration/profile/" + responseUsers.data.filter(user => user.userId === responsePost.data.owner)[0].userId)

                })

                setProfilePhotoExist(responsePost.data.fileSet);

            })
        }
        if (accessToken) {
            getData();
        }
    }, [postId])


    Geocode.fromLatLng(lat, lng).then(
        (response) => {
            const address = response.results[0].formatted_address;
            setLocation(address)
        },
        (error) => {
            console.error(error);
        }
    );

    const redirectToUser = (email) => {

        history.push({
            pathname: "/user/" + email
        })

    }


    return owner ? <div>

        <div style={{ display: "flex" }}>
            <Button onClick={() => {
                history.push({
                    pathname: "/"
                })
            }} color="primary" variant="contained">
                <FaArrowCircleLeft style={{ marginRight: "10px" }}> </FaArrowCircleLeft>Go back to properties</Button>
        </div>
        <Card className="cardDetails" >

            <div style={{ display: 'flex' }}>

                {profilePhotoExist?.map(photo => (
                    <AlertDialog photo={photo} owner={owner} imgs={profilePhotoExist}  >
                        <img style={{ width: "20%", marginLeft: "20px" }} src={"http://localhost:8090/posts/image/" + owner?.userId + "/" + photo.fileId}></img>
                    </AlertDialog>
                ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", placeContent: "space-between" }}>
                <h2 style={{ marginLeft: "20px", overflowWrap: "anywhere", marginRight: "5px" }}>{title}</h2>

                <div style={{ display: "flex", alignItems: "center", marginRight: 5 }}>
                    <CardActions className="actions" disableActionSpacing>
                        <IconButton aria-label="Add to favorites" onClick={handleClick} colorSecondary>
                            <FaHeart color={isActive ? "red" : "grey"} />
                        </IconButton>
                    </CardActions>

                    <Chip icon={<FaMapMarkerAlt></FaMapMarkerAlt>} label={location} />

                </div>
            </div>

            {/* <CardContent>
                <Typography component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent> */}
        </Card>

        <div style={{ display: "flex", alignItems: "center", marginRight: 5, placeContent: "space-between" }}>
            <div onClick={() => redirectToUser(owner?.email)} style={{ display: "flex", alignItems: "center" }}>
                <Avatar >
                    <img style={{ width: "100%" }} src={avatar} />

                </Avatar>
                <p style={{ marginLeft: "5px" }}> <strong>{owner?.name}</strong></p>
            </div>
            <Chip icon={<FaPhone />} label={owner?.phone} />

        </div>
        <p><strong>{description}</strong></p>
        <p><strong>Number of rooms:</strong>   <Chip label={noRooms}></Chip>
        </p>

        <p><strong>Near By</strong></p>
        {nearBy.map(fac => (
            <Chip label={fac?.name}></Chip>
        ))}
        <p><strong>Other Residences</strong></p>

        {otherResidences.map(residence => (
            <Chip label={residence?.name} onClick={() => redirectToUser(residence.email)}></Chip>
        ))}

    </div> : <div>ada</div>
}