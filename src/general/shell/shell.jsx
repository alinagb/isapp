import React, { useContext } from 'react';
import { IsAuthenticatedContext } from '../../contexts/authProvider';
import Header from './header/header';
// import Footer from './footer/footer';
// import Banner from './banner';
import './shell.css';
import Sidebar from './Sidebar';

/**
 * Renders the header, back link, body, and footer in a shell component.
 * @param {Element} children child element.
 * @param {string} backLinkUrl the backLink url
 */
export default function Shell({ children, backLinkUrl, keycloak }) {
    const { isAuthenticated } = useContext(IsAuthenticatedContext);

    return (
        <div className='shell'>
            <Header keycloak = {keycloak} />
            {isAuthenticated &&  <Sidebar></Sidebar>}

            <div className='shell-body'>
                <div>
                    {/* <Banner /> */}
                    {backLinkUrl && (
                        <a href={backLinkUrl} className="govuk-back-link"
                            data-testid='govuk-back-link'
                        >Back</a>
                    )}
                    <div className='children'>
                        {children}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}