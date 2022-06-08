import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Carousel from './Carousel';
import "./PopupDialog.css"


export default function AlertDialog({ photo, owner }) {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <div className='alina'>
            <img  onClick={handleClickOpen} style={{ width: "20%", marginLeft: "20px" }} src={"http://localhost:8090/posts/image/" + owner?.userId + "/" + photo.fileId}></img>

            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open alert dialog
            </Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                style={{ maxWidth: "1000px" }}
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Carousel photo={photo} owner={owner}></Carousel>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

