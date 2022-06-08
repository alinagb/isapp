import React, { useContext } from 'react';
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
    let history = useHistory();
    // const { header, logo } = useStyles();
    const { isAuthenticated, keycloak } = useContext(IsAuthenticatedContext);


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
                    <div style={{

                        position: 'relative',
                        marginLeft: 0,
                        width: '100%',
                        justifyContent: 'space-around',
                        display: 'flex',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        width: 'auto',
                        marginLeft: '8px',
                        alignItems: 'center'

                    }}>
                        <div style={{marginRight: '10px', marginLeft: '10px'}}>
                            <FaSearch />
                        </div>
                        <InputBase
                            placeholder="Search…"
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
                    </div>
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