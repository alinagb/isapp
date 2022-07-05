import { Button, Input, InputBase, TextField } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react'
import "./createPost.css"
import ImagesGallery from './ImagesGallery';
import ImageUploading from 'react-images-uploading';
import RecipeReviewCard from '../Card/RecipeReviewCard';
import SimpleTabs from '../SimpleTabs';
import { getAllPosts, getPostsByFaculty, getPostsByPrice, getPostsByRooms } from '../../integration/isapp-service';
import MeniuRadio from '../../../general/MeniuRadio';
import { FaSearch } from 'react-icons/fa';


export default function ListPosts() {

    const [posts, setPosts] = useState([]);
    const [searchValue, setSearchValue] = useState();
    const [filterBy, setFilterBy] = useState()

    useEffect(() => {
        const getData = async () => {
            await getAllPosts().then(response => {
                setPosts(response.data)
            })
        }
        getData();
    }, [])

    console.log(posts)

    const parentCallback = (childData) => {
        setFilterBy(childData)
    }

    const searchFilter = () => {
        console.log("filterBy", filterBy)
        setPosts(null)
        if (filterBy === 'price' && searchValue) {
            getPostsByPrice(searchValue).then(respoonse => {
                console.log("response", respoonse.data)
                setPosts(respoonse.data)

            })
            console.log("sort by price")

        } else if (filterBy === 'faculty' && searchValue) {
            getPostsByFaculty(searchValue).then(respoonse => {
                console.log("response", respoonse.data)
                setPosts(respoonse.data)

            })
            console.log("sort by faculty")

            console.log("filterBy", filterBy)
            console.log("searchValue", searchValue)

        }
        else if (filterBy === 'noRooms' && searchValue) {
            getPostsByRooms(searchValue).then(respoonse => {
                console.log("response", respoonse.data)
                setPosts(respoonse.data)

            })
            console.log("sort by rooms")

        }

    }

    return posts &&
        <div>
            <div style={{
                position: 'relative',
                marginLeft: 0,
                width: '30%',
                height: '10%',
                display: 'flex',
                borderRadius: '4px',
                backgroundColor: 'rgb(63, 100, 181)',
                marginLeft: '8px',
                marginBottom: '8px',
                alignItems: 'center',
                placeContent: 'space-between'

            }}>
                <MeniuRadio parentCallback={parentCallback}></MeniuRadio>

                <div style={{ marginRight: '10px', marginLeft: '10px' }}>
                    <FaSearch />
                </div>
                <InputBase
                    placeholder="Search…"
                    value={searchValue ? searchValue : ""}
                    onChange={e => setSearchValue(e.target.value)}
                    classes={{
                        root: {
                            color: 'inherit',
                            width: '100%'
                        },
                        input: {
                            width: '100%',
                        }
                    }}
                />
                <Button onClick={searchFilter} color="primary" variant="contained"> Search </Button>

            </div>

            <div style={{ display: "flex", flexFlow: "wrap", width: "105vw" }}>
                {posts.map(post => (
                    <RecipeReviewCard idPost={post.postId}></RecipeReviewCard>
                ))}
            </div>

        </div>
}