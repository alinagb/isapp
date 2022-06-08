import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { FaHeart } from "react-icons/fa";
import "./cardConsultant.css";

export default function CardConsultant( {avatar, imgAvatar, nume, ocupatie, tel, descriere}) {

    return (
        <Card className="cardConsultant">
            <div style={{ display: "flex", placeContent: "space-between" }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className="avatar">
                           {avatar}
                        </Avatar>
                    }
                    title={nume}
                    subheader={ocupatie}
                />
            </div>
            <div style={{ display: "flex", alignItems: "center", placeContent: "space-evenly" }}>
                <img style={{ width: "20%", marginLeft: "20px" }} src={imgAvatar}></img>
                <div>
                    <h2 style={{ marginLeft: "20px", overflowWrap: "anywhere", marginRight: "5px" }}>Tel: {tel}</h2>
                    <CardContent>
                        <Typography component="p">
                            {descriere}
                        </Typography>
                    </CardContent>

                </div>
            </div>

        </Card>
    );
}