import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { PROFILE_PAGE_URL_PATH } from '../config';
import { createUser } from '../integration/isapp-service';
import "../style/SignUpPage.css"
import { FaRegTimesCircle } from "react-icons/fa";

export default function SignUp() {


    let [email, setEmail] = useState('');
    let [name, setName] = useState('');
    let [password, setPassword] = useState('');
    let [phone, setPhone] = useState(null);
    let [error, setError] = useState(false);

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("The form was submitted with the following data:", name, password, email, phone);

        await createUser(name, password, email, phone).then((response) => {
            if (response.status === 201) {
                console.log("response ", response.status === 201)

                history.push({ pathname: PROFILE_PAGE_URL_PATH });

            } else {
                setError(true)
            }
        })
    }


    return (
        <div className="App">
            <div className="appForm">
                <div className="pageSwitcher">
                    <div className="formCenter">
                        <form onSubmit={handleSubmit} className="formFields">
                            <div className="formField">
                                <h1>Creare cont</h1>
                                {error ? <div style={{ color: "red" }}><FaRegTimesCircle></FaRegTimesCircle> Please fill coorrectly the form below </div> : <div></div>}
                                <h1></h1>
                                <label className="formFieldLabel" htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="formFieldInput"
                                    placeholder="Enter your full name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="formField">
                                <label className="formFieldLabel" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="formFieldInput"
                                    placeholder="Enter your password"
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="formField">
                                <label className="formFieldLabel" htmlFor="email">
                                    E-Mail Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="formFieldInput"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="formField">
                                <label className="formFieldLabel" htmlFor="email">
                                    Phone number
                                </label>
                                <input
                                    type="phone"
                                    id="phone"
                                    className="formFieldInput"
                                    placeholder="Enter your phone number"
                                    name="phone"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="formField">
                                <button className="formFieldButton">Sign Up</button>{" "}
                                <Link to="/profile" className="formFieldLink">
                                    I'm already member
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}