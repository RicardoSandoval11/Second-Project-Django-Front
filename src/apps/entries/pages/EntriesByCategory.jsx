import { Grid, Stack, Pagination, Link, Button } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEntryStore } from "../../../hooks/useEntryStore";
import { Checking } from "../../../ui/Checking";
import { NoResults } from "../../../ui/NoResults";
import { BlogLayout } from "../../layouts/BlogLayout";
import { Entry } from "../components/Entry";


export const EntriesByCategory = () => {

    // Getting category id
    const { id } = useParams();

    const { startLoadingEntriesByCategory } = useEntryStore();

    // Loading entries
    useEffect(() => {
        startLoadingEntriesByCategory(id);
    },[]);

    // Getting data from state
    const { status, entriesByCategory, next, previous } = useSelector( state => state.entry );

    const onPressPrevious = () => {
        startLoadingEntriesByCategory(id,previous,null);
    }

    const onPressNext = () => {
        startLoadingEntriesByCategory(id,null,next);
    }

  return (
      <>
        {
            status == 'searching' ?
            <BlogLayout>
                <Checking/>
            </BlogLayout>
            :
            <BlogLayout>

                {
                    entriesByCategory.length != 0 ?
                        <Grid
                            container
                            sx={{
                                display:'flex',
                                justifyContent: 'center',
                                padding: 1,
                                maxWidth:1400,
                                marginX: 'auto'
                            }}
                        >
                            <Grid
                                container
                                sx={{
                                    display:'flex',
                                    justifyContent: 'center',
                                    padding: 1
                                }}
                            >
                                {entriesByCategory.map((entry) => (
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
                    :

                        <NoResults/>
                }



            </BlogLayout>
            
        }
    </>
  )
}

