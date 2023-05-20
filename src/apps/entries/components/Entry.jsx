import { Card, 
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Link } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid } from '@mui/material';
import { useSelector } from "react-redux";
import { useEntryStore } from "../../../hooks/useEntryStore";
import Swal from 'sweetalert2';
import { useEffect } from "react";


export const Entry = ({entry}) => {

    const { status } = useSelector( state => state.auth );
    const { startAddingEntryToFavorites, startResetMessages } = useEntryStore();
    
    const onAddingFavorite = () =>{
        
        if( status == 'authenticated' ){
            startAddingEntryToFavorites(entry.id == undefined ? entry.entry : entry.id);
        }else{
            Swal.fire('Account is Required', 'Create an account to add entries to your favorites', 'info');
        }
    }

    const { entryToFavoritesSuccessMsg, entryToFavoriteFailMsg } = useSelector( state => state.entry );

    useEffect(() => {
        if(entryToFavoriteFailMsg != null){
            Swal.fire('Error Adding Entry to Favorites', entryToFavoriteFailMsg, 'error');
            startResetMessages();
        }
    },[entryToFavoriteFailMsg]);

    useEffect(() => {
        if(entryToFavoritesSuccessMsg != null){
            Swal.fire('Entry Added to Favorites', entryToFavoritesSuccessMsg, 'success');
            startResetMessages();
        }
    },[entryToFavoritesSuccessMsg]);


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
                <IconButton aria-label='add to favorites' onClick={onAddingFavorite}>
                    <FavoriteIcon/>
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


