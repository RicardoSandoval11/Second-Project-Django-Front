import { TextField, Grid, List, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCategoryStore } from "../../../hooks/useCategoryStore"
import { Checking } from "../../../ui/Checking";
import { BlogLayout } from "../../layouts/BlogLayout"
import { DisplayCategory } from "../components/DisplayCategory";


export const AllCategories = () => {

    const [kword, setKword] = useState('');

    const onKwordChange = (event) => {
        setKword(event.target.value);
    }

    const { startLoadingAllCategories } = useCategoryStore();

    useEffect(() => {
        startLoadingAllCategories(kword, null, null);
    },[kword]);

    const { status, categories, previous, next } = useSelector( state => state.category );

    const onPressNext = () => {
        startLoadingAllCategories(kword, next, null);
    }

    const onPressPrevious = () => {
        startLoadingAllCategories(kword, null, previous);
    }


  return (

    <>
        {
            status != 'searching' && categories.length > 0?
                <BlogLayout>
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            maxWidth: 1400,
                            marginX: 'auto',
                            padding: 2
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display:'flex',
                                justifyContent: 'start',
                                padding: 2
                            }}
                        >
                            <TextField
                                id="standard-search"
                                label="Filter"
                                type="text"
                                variant="standard"
                                onChange={onKwordChange}
                                value={kword}
                            />
                        </Grid>
                        {
                            <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                                {
                                    categories.map((category) =>(
                                        <DisplayCategory category={category} key={category.id}/>
                                    ))
                                }
                            </List>
                        }
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
                </BlogLayout>
            :
                <BlogLayout>
                    <Checking/>
                </BlogLayout>
        }
    
    </>
  )
}

