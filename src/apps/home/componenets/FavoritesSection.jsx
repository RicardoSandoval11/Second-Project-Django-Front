import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useEntryStore } from '../../../hooks/useEntryStore';
import { DisplayPopularEntry } from './DisplayPopularEntry';

export const MostFavoritesSection = () => {

  const { StartLoadingMostPopularEntries } = useEntryStore();

  useEffect(() => {
    StartLoadingMostPopularEntries();
  }, []);

  const { mostPopularEntries } = useSelector( state => state.entry );

  return (
    <Grid 
        item 
        xs={12}
        sx={{
            display:'flex',
            justifyContent:'center',
            flexWrap: 'wrap',
            marginY: 3,
            padding: 3
        }}
    >
        <Grid item xs={12} sx={{ margin: 2 }}>
            <Typography variant='h4'  sx={{ textAlign:'start', fontWeight:'800' }}>Most Popular Entries</Typography>
        </Grid>
          {
              mostPopularEntries.map(entry => (
                  <DisplayPopularEntry entry={entry} key={entry.entry}/>
              ))
          }
    </Grid>
  )
}
