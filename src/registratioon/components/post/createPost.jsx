import { Button, Checkbox, Chip, FormControl, Input, InputLabel, ListItemText, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react'
import "./createPost.css"
import ImageUploading from 'react-images-uploading';
import { FaArrowCircleLeft } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import { createPost, getFaculties, getUserByEmail, getUsers } from '../../integration/isapp-service';
import Map from './Map';

export default function CreatePost({ accessToken, userEmail }) {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [nearBy, setNearBy] = useState();
    const [price, setPrice] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [faculties, setFaculties] = useState([]);
    const [users, setUsers] = useState([]);
    const [images, setImages] = useState([]);
    const [owner, setOwner] = useState();
    const history = useHistory();
    const [files, setFiles] = useState([]);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const [names, setNames] = useState([]);
    const [facs, setFacs] = useState([]);
    const [noRooms, setNoRooms] = useState();

    const callback = (lat, lng) => {
        setLat(lat)
        setLng(lng)
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        getUsers().then((response) => {
            setUsers(response.data)

        })
        getFaculties().then((responseFac) => {
            setFaculties(responseFac.data)
        })
        getUserByEmail(accessToken, userEmail).then(response => {
            setOwner(response.data.userId)
        })


    }, [accessToken, files])

    const createPostInDb = async () => {
        console.log("files in", files)
        console.log("images in", images)

        await createPost(accessToken, files, title, description, JSON.stringify(names), owner, JSON.stringify(facs), lat, lng, price, noRooms).then(response => {
            if (response.status === 201) {
                history.push({
                    pathname: "/post/" + response.data.postId
                })
            }
        })
    }

    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submits
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        imageList.map(i => {
            setFiles([...files, i.file]);

        })
    };

    const handleChangeUsers = event => {
        setNames(event.target.value);
    };


    const handleChangeFacs = event => {
        setFacs(event.target.value);
    };

    return <div>
        <div style={{ display: "flex" }}>
            <Button onClick={() => {
                history.push({
                    pathname: "/"
                })
            }} color="primary" variant="contained">
                <FaArrowCircleLeft style={{ marginRight: "10px" }}> </FaArrowCircleLeft>Go back to properties</Button>
        </div>
        <h1> Add new property </h1>
        <p> * If there are residents, make sure they have an account already created</p>
        <div className="fields">
            <div className="column1">
                <TextField
                    id="standard-helperText"
                    label="Title: "
                    defaultValue=" "
                    className="textField"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    margin="normal"
                />

                <TextField
                    id="standard-helperText"
                    label="Price (EUR): "
                    defaultValue=" "
                    className="textField"
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    margin="normal"
                />
                <TextField
                    id="standard-helperText"
                    label="Number of rooms "
                    type="number"
                    defaultValue=" "
                    className="textField"
                    value={noRooms}
                    onChange={e => setNoRooms(e.target.value)}
                    margin="normal"
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Description: "
                    defaultValue={description ? description : " "}
                    multiline
                    minRows="21"
                    variant="outlined"
                    margin="normal"
                    className="textField-multi"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            <div className="column1">
                <FormControl className="{classes.formControl}">
                    <InputLabel htmlFor="select-multiple-users">Other Residences:</InputLabel>
                    <Select
                        multiple
                        value={names}
                        onChange={handleChangeUsers}
                        input={<Input id="select-multiple-users" />}
                        renderValue={selected => selected.map(user => user.name).join(', ')}
                        MenuProps={MenuProps}
                    >
                        {users.map(user => (
                            <MenuItem key={user.name} value={user}>
                                <Checkbox checked={user.name.indexOf(user.name) > -1} />
                                <ListItemText primary={user.name} />
                            </MenuItem>
                        )

                        )}
                    </Select>
                </FormControl>

                <FormControl className="{classes.formControl}">
                    <InputLabel htmlFor="select-multiple-faculties">Near By:</InputLabel>
                    <Select
                        multiple
                        value={facs}
                        onChange={handleChangeFacs}
                        input={<Input id="select-multiple-faculties" />}
                        renderValue={selected => selected.map(faculty => faculty.name).join(', ')}
                        MenuProps={MenuProps}
                    >
                        {faculties.map(faculty => (
                            <MenuItem key={faculty.facultyId} value={faculty}>
                                <Checkbox checked={faculty.name.indexOf(faculty.name) > -1} />
                                <ListItemText primary={faculty.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <p>Location: </p>
                <Map parentCallBack={callback}></Map>

            </div>
        </div>

        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
            }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    <Button color="primary" variant="contained" component="span"
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        Click to upload
                    </Button>
                    &nbsp;
                    {images.length != 0 && <Button color="primary" variant="contained" component="span" onClick={onImageRemoveAll}>Remove all images</Button>}
                    <div style={{ display: "flex", marginTop: 10 }}>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                &nbsp;
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper" style={{ marginRight: 20 }}>
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    &nbsp;
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </ImageUploading>
        <div style={{ display: "flex", justifyContent: "center", marginRight: 100 }}>
            <Button onClick={() => {
                createPostInDb();
            }} color="primary" variant="contained">SAVE</Button>
        </div>
    </div>
}