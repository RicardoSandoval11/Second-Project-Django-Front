import { Grid, Button } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useEntryStore } from "../../../hooks/useEntryStore";
import { Checking } from "../../../ui/Checking";
import { NoResults } from "../../../ui/NoResults";
import { BlogLayout } from "../../layouts/BlogLayout";
import { MyEntry } from "../components/MyOwnEntry";



export const DisplayMyEntries = () => {

    const { startLoadingMyEntries } = useEntryStore();
    
    // Getting data from state
    const { status, myEntries, next, previous } = useSelector( state => state.entry );

    // Loading entries
    useEffect(() => {
        startLoadingMyEntries(null, null);
    },[]);

    const onPressPrevious = () => {
        startLoadingMyEntries(previous,null);
    }

    const onPressNext = () => {
        startLoadingMyEntries(null,next);
    }

  return (
      <>
        {
            status == 'searching' || myEntries == []?
            <BlogLayout>
                <Checking/>
            </BlogLayout>
            :
            <BlogLayout>

                {
                    myEntries.length != 0 ?
                        <Grid
                            container
                            sx={{
                                display:'flex',
                                justifyContent: 'center',
                                padding: 1,
                                maxWidth:1400,
                                marginX: 'auto'
                            }}
                            className="animate__animated animate__fadeIn animate__faster"
                        >
                            <Grid
                                container
                                sx={{
                                    display:'flex',
                                    justifyContent: 'center',
                                    padding: 1
                                }}
                            >
                                {myEntries.map((entry) => (
                                    <MyEntry entry = {entry} key={entry.id}/>
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

