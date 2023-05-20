import { useState } from "react";

import { Card, 
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Link } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useEntryStore } from "../../../hooks/useEntryStore";
import { useNavigate } from "react-router-dom";

export const MyEntry = ({entry}) => {

    const navigate = useNavigate();

    const { startDeletingEntry } = useEntryStore();

    const onEditEntry = () => {
        navigate(`/entries/update-entry/${entry.id}`);
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const closeMenu = () => {
        setOpen(false);
    }

    const onDeletingEntry = () => {
        startDeletingEntry(entry.id);
        setOpen(false);
        window.location.reload();
    };


  return (
    <Grid item xs={12} sm={7} md={5} lg={4} xl={4} marginX={1} marginY={2} >
        <Card>
            <CardHeader
                title={entry.title.length > 25 ? entry.title.slice(0,25)+'...' : entry.title} 
                subheader={'Created: '+ entry.created}
            />
            <CardMedia
                component='img'
                height='194'
                image={entry.image}
                alt='Entry image'
            />
            <CardContent>
                <Typography variant='body2' color='text.secondary'>
                    {entry.summary.length > 150? entry.summary.slice(0,150) + '...' : entry.summary}
                </Typography>
                <Typography sx={{
                    marginTop: 2
                }}>
                    {'Created by: '+entry.user.full_name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label='add to favorites' onClick={handleClickOpen}>
                    <RemoveCircleIcon/>
                </IconButton>
                <Dialog
                    open={open}
                    onClose={closeMenu}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {`Do You Want To Remove "${entry.title}" From Your Entries?`}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Once you have deleted the entry "${entry.title}" you will not be able to recover it`}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={closeMenu}>Cancel</Button>
                    <Button onClick={onDeletingEntry} autoFocus>
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>
                <IconButton aria-label='add to favorites' onClick={onEditEntry}>
                    <EditIcon/>
                </IconButton>
            </CardActions>
            <CardActions sx={{padding:2}}>
                <Link 
                    href={`/entries/entry-details/${entry.id}`}
                    color='inherit'
                    underline="none"
                >
                    View details
                </Link> 
            </CardActions>
        </Card>
    </Grid>
  )
}


