import "./Sidebar.css";
import SidebarLink from "./SidebarLink";
import { FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Button } from "@material-ui/core";
import { FaPlus } from "react-icons/fa";
import { CREATE_POST_PAGE_URL_PATH, MAP_PAGE_URL_PATH, VIEW_FAVORITE_POSTS_URL_PATH } from "../../registratioon/config";
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import { IsAuthenticatedContext } from "../../contexts/authProvider";

function Sidebar() {
    const history = useHistory();
    const { isAuthenticated } = useContext(IsAuthenticatedContext);

    return (
        <div className="sidebar">

            <div onClick={() => {
                history.push({
                    pathname: MAP_PAGE_URL_PATH
                })
            }} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <FaMapMarkerAlt></FaMapMarkerAlt>
                <SidebarLink text="Map view"></SidebarLink>
            </div>

            {isAuthenticated && <div onClick={() => {
                history.push({
                    pathname: VIEW_FAVORITE_POSTS_URL_PATH
                })
            }} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <FaHeart></FaHeart>
                <SidebarLink text="Favourites" ></SidebarLink>
            </div>}
            {isAuthenticated && <div style={{ marginTop: "auto" }}>
                <Button onClick={() => {
                    history.push({
                        pathname: CREATE_POST_PAGE_URL_PATH
                    })
                }} color="primary" variant="contained">
                    <FaPlus style={{ marginRight: 8 }}></FaPlus> NEW POST
                </Button>
            </div>}
        </div>
    );
}

export default Sidebar;