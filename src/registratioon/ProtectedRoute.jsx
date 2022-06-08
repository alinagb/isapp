import React, { useState, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';
import Keycloak from 'keycloak-js';
import { useHistory } from 'react-router-dom';
import { IsAuthenticatedContext } from '../contexts/authProvider';

/**
 * Handles the behavior of a protected component requiring authentication. 
 */

const ProtectedRoute = ({
    component: Component,
    path,
    ...rest }) => {
    const history = useHistory();

    const { isAuthenticated, setIsAuthenticated, keycloak, setKeycloak} = useContext(IsAuthenticatedContext);

    useEffect(() => {
        const initKeycloak = Keycloak('/keycloak.json');

        initKeycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            setKeycloak(initKeycloak);
            setIsAuthenticated(true);

        }).catch((e) => {
            history.push({
                pathname: "/error"
            })
        })
    }, [])
    return (
        <Route {...rest} exact path={path} render={props => (
            isAuthenticated ?
                <Component {...props} accessToken={keycloak?.token} userEmail={keycloak?.tokenParsed?.preferred_username} keycloak={keycloak} />
                : <div data-testid='invalid-token'></div>
        )} />
    )

}

export default ProtectedRoute;