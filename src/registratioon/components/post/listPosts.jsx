import { Button, Input, TextField } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react'
import "./createPost.css"
import ImagesGallery from './ImagesGallery';
import ImageUploading from 'react-images-uploading';
import RecipeReviewCard from '../Card/RecipeReviewCard';
import SimpleTabs from '../SimpleTabs';
import { getAllPosts } from '../../integration/isapp-service';


export default function ListPosts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getData = async () => {
           await getAllPosts().then(response => {
                setPosts(response.data)
            })
        }
        getData();
    }, [])

    console.log(posts)
    return posts && <div style={{ display: "flex", flexFlow: "wrap", width: "105vw" }}>
        {posts.map(post => (
            <RecipeReviewCard idPost={post.postId}></RecipeReviewCard>
        ))}
    </div>
}