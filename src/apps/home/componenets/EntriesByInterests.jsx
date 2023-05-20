import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useEntryStore } from '../../../hooks/useEntryStore';
import { Entry } from './DisplayLastEntry';

export const EntriesByInterests = () => {

  let entries = new Array();

  const { startLoadingEntriesByIntersts } = useEntryStore();

  const token = localStorage.getItem('token');

  if (token != undefined) {
    useEffect(() => {
      startLoadingEntriesByIntersts(token);
    },[]);
  }

  const { entriesByIntersts } = useSelector( state => state.entry );


  if(entriesByIntersts.length != 0){
    entries = entriesByIntersts.payload;
  }

  if(entries.length > 0){

    return (
      <>
        {
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
                  <Typography variant='h4'  sx={{ textAlign:'start', fontWeight:'800' }}>Entries You Might Like</Typography>
              </Grid>
              {
                entries.map(entry => (
                    <Entry entry={entry} key={entry.id}/>
                ))
            }
          </Grid>
        }
      </>
    )

  }else{
    return (
      <></>
    )
  }

}
