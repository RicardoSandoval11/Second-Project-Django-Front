import { BlogLayout } from "../../layouts/BlogLayout";
import { Grid, Typography, Button } from '@mui/material';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useEntryStore } from "../../../hooks/useEntryStore";
import { Checking } from "../../../ui/Checking";
import { Entry } from "./Entry";

export const EntryFiltered = () => {

  const { id } = useParams();

  const { startLoadingEntriesByTag } = useEntryStore();

  useEffect(() => {
    startLoadingEntriesByTag(id, null, null);
  },[]);

  const { filteredEntries, status, next, previous } = useSelector( state => state.entry );

  const onPressPrevious = () => {
    startLoadingEntriesByTag(id,previous,null);
  }

  const onPressNext = () => {
    startLoadingEntriesByTag(id,null,next);
  }

    return (
      <>
        {
          status == 'completed'?
          <BlogLayout>
          <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container
            spacing={2}
            sx={{
              backgroundColor: 'white',
              display:'flex',
              flexDirection:'row',
              flexWrap:'wrap',
              padding:3,
              maxWidth:1400,
              marginX:'auto',
              justifyContent:'center'
            }}
          >
          <Grid item xs={12} marginY={1} sx={{ marginX:2}}>
            <Typography fontSize={40} fontWeight='light' align="left" sx={{padding:1,fontStyle:'italic' }}>Filtered Entries</Typography>
          </Grid>
          <Grid
            container
            sx={{
              display:'flex',
              justifyContent: 'center'
            }}
          >
            {filteredEntries.results.map((entry) => (
                entry.public == true ?
                <Entry entry = {entry} key={entry.id}/>
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
          </Grid>
          </BlogLayout>
          :
          <BlogLayout>
            <Checking/>
          </BlogLayout>
        }
      
      </>
    )

}

