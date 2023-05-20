import { Card, 
    CardHeader,
    CardMedia,
    CardActions,
    Typography, 
    CardContent,
    Grid,
    Link} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from "react-redux";
import { useEntryStore } from "../../../hooks/useEntryStore";
import Swal from 'sweetalert2';
import { useEffect } from "react";

export const DisplayPopularEntry = ({entry}) => {

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
    <Grid item m={1} sx={{maxWidth:{xs:400,lg:300}}}>
        <Card>
            <CardHeader
            
            title={entry.title.length > 25 ? entry.title.slice(0,25)+'...' : entry.title}
            />
            <CardMedia
                component='img'
                sx={{
                    maxHeight: 150
                }}
                image={entry.image}
                alt='Entry image'
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {entry.summary.length > 125? entry.summary.slice(0,125) + '...' : entry.summary}
                </Typography>
            </CardContent>
            <CardActions sx={{padding:2}}>
                <IconButton 
                    aria-label='add to favorites' 
                    sx={{
                        display:'flex', 
                        justifyContent:'space-between', 
                        width:'18%'
                    }}
                    onClick={onAddingFavorite}
                >
                <Typography>{entry.likes}  </Typography><FavoriteIcon/> 
                </IconButton>
            </CardActions>
            <CardActions>
                    <Link 
                        href={`/entries/entry-details/${entry.id == undefined ? entry.entry : entry.id}`}
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

