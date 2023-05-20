import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useEntryStore } from '../../../hooks/useEntryStore';
import { Entry } from './DisplayLastEntry';


export const LastCreatedSection = () => {

    useEffect(() => {
        startLoadingLastEntriesCreated();
    },[]);

    const { mostRecentEntries } = useSelector( state => state.entry );

    const { startLoadingLastEntriesCreated } = useEntryStore();



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
            <Typography variant='h4'  sx={{ textAlign:'start', fontWeight:'800' }}>Last Entries Added</Typography>
        </Grid>
            {
                mostRecentEntries.map(entry => (
                    <Entry entry={entry} key={entry.id}/>
                ))
            }
    </Grid>
  )
}



