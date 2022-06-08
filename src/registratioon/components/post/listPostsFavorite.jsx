import { Button, Input, TextField } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react'
import "./createPost.css"
import ImagesGallery from './ImagesGallery';
import ImageUploading from 'react-images-uploading';
import RecipeReviewCard from '../Card/RecipeReviewCard';
import SimpleTabs from '../SimpleTabs';
import { getAllPosts, getFavouritePosts, getUserByEmail } from '../../integration/isapp-service';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';


export default function ListPostsFavorite({ accessToken, userEmail }) {

    const [posts, setPosts] = useState([]);
    const history = useHistory();

    console.log("userEmail", userEmail)
    useEffect(() => {
        // const getPosts = async (idPost) => {
        //     await getPostById(idPost).then(responsePost => {
        //          console.log("rrrr", responsePost)
        //          setTitle(responsePost.data.title)
        //          setDescription(responsePost.data.description)
        //          setPrice(responsePost.data.price)

        //          getUsers().then((responseUsers) => {

        //              setOwner(responseUsers.data.filter(user => user.userId === responsePost.data.owner)[0])
        //              console.log(responseUsers.data.filter(user => user.userId === responsePost.data.owner)[0].userId)
        //              setAvatar("http://localhost:8090/registration/profile/" + responseUsers.data.filter(user => user.userId === responsePost.data.owner)[0].userId)

        //          })
        //          setProfilePhotoExist(responsePost.data.mainPhoto);

        //      })
        //  }

        const getData = async () => {

            await getFavouritePosts(accessToken, userEmail).then(response => {
                console.log("response", response.data)
                setPosts(response.data);
            })

        }
        getData();
    }, [])

    return <div>
        <div style={{ display: "flex", marginBottom: 20 }}>
            <Button onClick={() => {
                history.push({
                    pathname: "/"
                })
            }} color="primary" variant="contained">
                <FaArrowCircleLeft style={{ marginRight: "10px" }}> </FaArrowCircleLeft>Go back to properties</Button>
        </div>
        {posts?.length !== 0 ? <div style={{ display: "flex", flexFlow: "wrap", width: "105vw" }}>
            {posts.map(post => (
                <RecipeReviewCard idPost={post.postId}></RecipeReviewCard>
            ))}
        </div> : <div>You don't have any favorite posts</div>}
    </div>
}