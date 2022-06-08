
import React, { useState } from 'react';


export const IsAuthenticatedContext = React.createContext(null);

export function IsAuthenticatedProvider({
    children
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [keycloak, setKeycloak] = useState(null);

    return <IsAuthenticatedContext.Provider value={{ isAuthenticated, setIsAuthenticated, keycloak, setKeycloak }}>{children}</IsAuthenticatedContext.Provider>
}
