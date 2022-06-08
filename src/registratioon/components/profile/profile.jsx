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

export default function Profile({ accessToken, userEmail }) {

    const [file, setFile] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [university, setUniversity] = useState();
    const [faculty, setFaculty] = useState();
    const [description, setDescription] = useState();
    const [profilePhoto, setProfilePhoto] = useState();
    const [universities, setUniversities] = useState([]);
    const [profilePhotoExist, setProfilePhotoExist] = useState(null);
    const [faculties, setFaculties] = useState([]);
    const [displayNewPhoto, setDisplayNewPhoto] = useState();

    let history = useHistory();

    useEffect(() => {
        const getUser = async (userEmail) => {
            await getUserByEmail(accessToken, userEmail).then(
                response => {

                    if (response && response.status === 200) {
                        console.log("useeer ", response.data)
                        setName(response.data.name);
                        setEmail(response.data.email);
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
            getUser(userEmail);
        }

    }, [accessToken, userEmail])

    const updateUserBD = (accessToken) => {
        let facultyId = faculties.filter(f => f.name === faculty);

        updateUser(accessToken, email, name, phone, description, profilePhoto, facultyId[0].facultyId).then((response) => {
            console.log("response --- ", response.data)
            if(response.status === 200){
                history.push({
                    pathname: "/"
                })
            }
        })
    }
    function handleChange(e) {
        const formData = new FormData();
        // formData.append("file", e.file[0]);
        console.log("eeeee", e.target.files[0])

        setProfilePhoto(e.target.files[0]);
        setDisplayNewPhoto(URL.createObjectURL(e.target.files[0]));
    }

console.log("displayNewPhoto", displayNewPhoto)
    return <div className='profile'>
        <div style={{ display: "flex" }}>
            <Button onClick={() => {
               history.push({
                   pathname: "/"
               })
            }} color="primary" variant="contained">
                <FaArrowCircleLeft style={{marginRight: "10px"}}> </FaArrowCircleLeft>Go back to properties</Button>
        </div>

        <h1>Profile</h1>

        <div className='imageAndPersonalDetails'>
            <div className="image" style={{ width: "40%" }} >
                <img src={displayNewPhoto ? displayNewPhoto : profilePhotoExist} />
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" onChange={handleChange} multiple type="file" style={{ display: 'none' }} />
                    <Button color="primary" variant="contained" component="span">
                        Upload
                    </Button>
                </label>
            </div>


            <div className='details'>

                <TextField
                    id="standard-helperText"
                    label="Name:"
                    defaultValue={name ? name : " "}
                    className="textField"
                    value={name ? name : " "}
                    onChange={e => setName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    id="standard-helperText"
                    label="Email:"
                    defaultValue={email ? email : " "}
                    disabled
                    className="textField"
                    value={email ? email : " "}
                    // onChange={e => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    id="standard-helperText"
                    label="Phone: "
                    defaultValue={phone ? phone : " "}
                    className="textField"
                    value={phone ? phone : " "}
                    onChange={e => setPhone(e.target.value)}
                    margin="normal"
                />

                <TextField
                    id="standard-select-currency-native"
                    select
                    label="University: "
                    value={university ? university : " "}
                    onChange={e => {
                        setUniversity(e.target.value)
                    }
                    }
                    SelectProps={{
                        native: true
                    }}
                    focused
                    margin="normal"
                >
                    {universities?.map(option => (
                        <option key={option.id} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </TextField>
                {university && <TextField
                    id="standard-select-currency-native"
                    select
                    label="Faculty: "
                    value={faculty ? faculty : " "}
                    onChange={e => setFaculty(e.target.value)}
                    SelectProps={{
                        native: true
                    }}
                    focused
                    margin="normal"
                >
                    {faculties?.filter(option => {
                        return option.university.name == university
                    })
                        .map(option => (
                            <option key={option.id} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                </TextField>
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
                variant="outlined"
                margin="normal"
                className="textField-multilined"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => {
                updateUserBD(accessToken);
            }} color="primary" variant="contained">SAVE</Button>
        </div>

    </div >
}
