import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import { FaHeart } from "react-icons/fa";
import "./RecipeReviewCard.css";
import { useHistory } from 'react-router-dom';
import { getPostById, getUsers } from '../../integration/isapp-service';


export default function RecipeReviewCard({ idPost }) {
    const history = useHistory();
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [owner, setOwner] = useState();
    const [profilePhotoExist, setProfilePhotoExist] = useState();
    const [price, setPrice] = useState();
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        const getData = async () => {
           await getPostById(idPost).then(responsePost => {
                console.log("rrrr", responsePost)
                setTitle(responsePost.data.title)
                setDescription(responsePost.data.description)
                setPrice(responsePost.data.price)

                getUsers().then((responseUsers) => {
                    
                    setOwner(responseUsers.data.filter(user => user.userId === responsePost.data.owner)[0])
                    console.log(responseUsers.data.filter(user => user.userId === responsePost.data.owner)[0].userId)
                    setAvatar("http://localhost:8090/registration/profile/" + responseUsers.data.filter(user => user.userId === responsePost.data.owner)[0].userId)

                })
                setProfilePhotoExist(responsePost.data.mainPhoto);

            })
        }
        getData();
    }, [])
    const pushToPostDetails = () => {
        history.push({
            pathname: "/post/" + idPost
        })
    }
    return (
        <Card className="card" onClick={pushToPostDetails} style={{height: "550px"}}>
            <div style={{ display: "flex", placeContent: "space-between" }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className="avatar">
                            <img style={{width: "100%"}} src={avatar} />
                        </Avatar>
                    }
                    // action={
                    //     <IconButton>
                    //         <MoreVertIcon />
                    //     </IconButton>
                    // }
                    title={owner?.name}
                    // subheader="September 14, 2016"
                />

        
            </div>
            <img style={{ width: "90%", marginLeft: "20px" , height: "50%"}} src={"http://localhost:8090/posts/image/" + owner?.userId + "/" + profilePhotoExist?.fileId}></img>

            <div style={{ display: "flex", alignItems: "center", placeContent: "space-evenly" }}>
                <h2 style={{ marginLeft: "20px", overflowWrap: "anywhere", marginRight: "5px" }}>{title}</h2>
                <h3 style={{ marginRight: "20px" }}>{price} EUR</h3>
            </div>

            <CardContent>
                <Typography component="p">
                    {description}
                </Typography>
            </CardContent>


        </Card>
    );
}

