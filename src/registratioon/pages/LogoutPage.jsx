import React, { useContext, useEffect } from 'react';
import { IsAuthenticatedContext } from '../../contexts/authProvider';
import SimpleTabs from '../components/SimpleTabs';
import { useHistory } from 'react-router-dom';

export default function LogoutPage() {

    const { isAuthenticated, keycloak } = useContext(IsAuthenticatedContext);

    let history = useHistory();

    useEffect(() => {
            keycloak.logout();
            history.push({
                pathname: "/"
            })

    }, [isAuthenticated, keycloak]);

    return isAuthenticated ? (<div></div>) : (<SimpleTabs></SimpleTabs>)
}