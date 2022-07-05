import React, { useContext, useEffect, useState } from 'react';
import './header.css';
import { useHistory } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    InputBase,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { FaUserAlt, FaBars, FaSearch } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import IconButton from '@material-ui/core/IconButton';
import { IsAuthenticatedContext } from '../../../contexts/authProvider';
import { SIGN_UP_PAGE_URL_PATH } from '../../../registratioon/config';

export default function Header() {
    // const { header, logo } = useStyles();
    const { isAuthenticated, keycloak } = useContext(IsAuthenticatedContext);


    useEffect(() => {

    })
    const headersData = [

        isAuthenticated && {
            icon: <FaUserAlt></FaUserAlt>,
            href: "/profile",
        },

        isAuthenticated && {
            icon: <IoMdSettings></IoMdSettings>,
            href: "/settings",
        },

        isAuthenticated ? {
            label: "Log Out",
            href: "/logout"
        } : {
            label: "Log In",
            href: SIGN_UP_PAGE_URL_PATH
        },
    ];

    const displayDesktop = () => {
        return (
            <Toolbar className="header">
                <div className="meniulogo">
                    {isAuthenticated && <IconButton className="meniu-style" color="inherit" aria-label="Menu">
                        <FaBars />
                    </IconButton>}
                    {femmecubatorLogo}

                </div>

                <div className='buttons-header'>
                   
                    {getMenuButtons()}

                </div>
            </Toolbar >
        );
    };


    const femmecubatorLogo = (
        <Typography variant="h6" component="h1" >
            ISAPP
        </Typography>
    );

    const getMenuButtons = () => {
        return headersData.map(({ icon, label, href }) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: RouterLink,
                    }}
                >

                    {icon}
                    {label}

                </Button>
            );
        });
    };

    return (
        <header> <AppBar>{displayDesktop()}</AppBar></header>
    )
}