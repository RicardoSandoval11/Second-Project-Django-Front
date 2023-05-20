import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Button ,Grid, Typography } from '@mui/material';

import { BlogLayout } from '../../layouts/BlogLayout';
import { Checking } from '../../../ui/Checking';
import { EntryFavorite } from '../../entries/components/EntryFavorite';
import { useFavoritesStore } from '../../../hooks/useFavoritesStore';

export const MyFavoritespage = () => {

    const { startLoadingMyFavorites } = useFavoritesStore();

    useEffect(() => {
        startLoadingMyFavorites(null, null);
    },[]);
    
    const { status, myFavorites, next, previous } = useSelector( state => state.favorites );


    const onPressPrevious = () => {
        startLoadingMyFavorites(previous,null);
    }

    const onPressNext = () => {
        startLoadingMyFavorites(null,next);
    }


  return (
    <BlogLayout>
        <Grid
            sx={{
                display: 'flex',
                maxWidth: 1400,
                marginX: 'auto',
                flexWrap: 'wrap'
            }}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid
                item
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginY: 2,
                    width: '100%'
                }}
            >
                <Typography variant='h3' sx={{fontWeight: 600, fontStyle: 'italic'}}>
                    My Favorites
                </Typography>
            </Grid>
            <Grid
                item
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    flexWrap: 'wrap'
                }}
            >
                {
                    status == 'searching' ?
                        <Checking/>
                    :
                    <>
                        <Grid
                            container
                            sx={{
                                display:'flex',
                                justifyContent: 'center',
                                padding: 1
                            }}
                        >
                            {myFavorites.map((entry) => (
                                entry.entry.public?
                                <EntryFavorite entry = {entry.entry} key={entry.entry.id} favoriteId={entry.id}/>
                                :
                                <></>
                            ))}
                        </Grid>
                        <Grid 
                            container
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                margin: 3
                            }}
                        >
                            <Grid 
                                item 
                                sx={{ width: '50%', display:'flex', justifyContent:'end' }}
                                
                            >
                                <Button
                                    sx={{
                                        backgroundColor:'#E7E3E3',
                                        padding: 1,
                                        color: 'black',
                                        textDecoration: 'none',
                                        marginX: 1,
                                        borderRadius: '10px',
                                        '&:hover':{
                                            opacity: 0.8
                                        }
                                    }}
                                    disabled={previous == null }
                                    onClick={onPressPrevious}
                                >
                                    Previous
                                </Button>
                            </Grid>
                            <Grid 
                                item 
                                sx={{ width: '50%', display:'flex', justifyContent:'start' }}
                                display={next == null ? 'none' : ''}
                            >
                                <Button
                                    sx={{
                                        backgroundColor:'#E7E3E3',
                                        padding: 1,
                                        color: 'black',
                                        textDecoration: 'none',
                                        borderRadius: '10px',
                                        marginX: 1,
                                        '&:hover':{
                                            opacity: 0.8
                                        }
                                    }}
                                    disabled={next == null }
                                    onClick={onPressNext}
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                }
            </Grid>
        </Grid>
      
    </BlogLayout>
  )
}

