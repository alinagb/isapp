import React from 'react';
import { useState, useEffect } from 'react'
import "./profile.css"
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { getFaculties, getUniversities, getUserByEmail, updateUser } from '../../integration/isapp-service';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { FaArrowCircleLeft } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Chip } from '@material-ui/core';

export default function UserProfile({ accessToken }) {

    const [name, setName] = useState();
    const [userProvidedEmail, setUserProvidedEmail] = useState();
    const [phone, setPhone] = useState();
    const [university, setUniversity] = useState();
    const [faculty, setFaculty] = useState();
    const [description, setDescription] = useState();
    const [profilePhoto, setProfilePhoto] = useState();
    const [universities, setUniversities] = useState([]);
    const [profilePhotoExist, setProfilePhotoExist] = useState(null);
    const [faculties, setFaculties] = useState([]);
    const [displayNewPhoto, setDisplayNewPhoto] = useState();
    const { email } = useParams();

    let history = useHistory();

    useEffect(() => {
        const getUser = async (email) => {
            await getUserByEmail(accessToken, email).then(
                response => {

                    if (response && response.status === 200) {
                        console.log("useeer ", response.data)
                        setName(response.data.name);
                        setUserProvidedEmail(response.data.email);
                        setPhone(response.data.phone);
                        setFaculty(response.data.facultyId);
                        setDescription(response.data.description);
                        // setProfilePhoto(response.data.profilePhoto);

                        getUniversities(accessToken).then((response) => {
                            setUniversities(response.data)
                        })
                        getFaculties().then((responseFac) => {
                            setFaculties(responseFac.data)
                            if (response.data.facultyId) {
                                setUniversity(responseFac.data?.filter(f => f.facultyId === response.data.facultyId)[0]?.university.name)
                                setFaculty(responseFac.data?.filter(f => f.facultyId === response.data.facultyId)[0].name)
                            }
                        })
                        if (response.data.profilePhoto) {
                            console.log("aaa", response.data.userId)
                            setProfilePhotoExist("http://localhost:8090/registration/profile/" + response.data.userId)

                        }
                    } else {
                        console.log("error")
                    }
                }
            );
        }
        if (!accessToken) {
            console.log("accessToken error", accessToken)
        } else {
            getUser(email);
        }

    }, [accessToken, email])

    function handleChange(e) {
        const formData = new FormData();
        // formData.append("file", e.file[0]);
        console.log("eeeee", e.target.files[0])

        setProfilePhoto(e.target.files[0]);
        setDisplayNewPhoto(URL.createObjectURL(e.target.files[0]));
    }

    return <div className='profile'>
        <div style={{ display: "flex" }}>
            <Button onClick={() => {
                history.push({
                    pathname: "/"
                })
            }} color="primary" variant="contained">
                <FaArrowCircleLeft style={{ marginRight: "10px" }}> </FaArrowCircleLeft>Go back to properties</Button>
        </div>

        <h1>Profile</h1>

        <div className='imageAndPersonalDetails'>
            <div className="image" style={{ width: "40%" }} >
                <img src={displayNewPhoto ? displayNewPhoto : profilePhotoExist} />
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" onChange={handleChange} multiple type="file" style={{ display: 'none' }} />

                </label>
            </div>


            <div className='details'>
                <TextField
                    id="standard-helperText"
                    label="Name:"
                    defaultValue={name ? name : " "}
                    className="textField"
                    disabled
                    value={name ? name : " "}
                    // onChange={e => setName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    id="standard-helperText"
                    label="Email:"
                    defaultValue={userProvidedEmail ? userProvidedEmail : " "}
                    disabled
                    className="textField"
                    value={userProvidedEmail ? userProvidedEmail : " "}
                    // onChange={e => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    id="standard-helperText"
                    label="Phone: "
                    defaultValue={phone ? phone : " "}
                    className="textField"
                    disabled
                    value={phone ? phone : " "}
                    margin="normal"
                />
                {
                    <Chip label={faculty ? faculty : "No Faculty"}></Chip>

                }

            </div>
        </div>
        <div className='description'>
            <TextField
                id="outlined-multiline-static"
                label="Description: "
                defaultValue={description ? description : " "}
                multiline
                minRows="10"
                disabled
                variant="outlined"
                margin="normal"
                className="textField-multilined"
                value={description}
            />
        </div>

    </div >
}
