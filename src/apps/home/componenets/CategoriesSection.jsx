import { Grid, Typography } from '@mui/material';
import { DisplayCategory } from './DisplayCategory';
import { useCategoryStore } from '../../../hooks/useCategoryStore';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const CategoriesSection = () => {

    const { startLoadingHomeCategories } = useCategoryStore();
    
    //
    useEffect(() => {
        startLoadingHomeCategories();
    },[]);

    const { categoriesHome } = useSelector(state => state.category);

  return (
    <Grid 
        item 
        xs={12}
        sx={{
            display:'flex',
            justifyContent:'center',
            flexWrap: 'wrap'
        }}
    >
        <Grid item xs={12} sx={{ margin: 2 }}>
            <Typography variant='h4' component='div' sx={{ textAlign:'start', fontWeight:'800' }}>Categories</Typography>
        </Grid>
        <Grid
            container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}
        >
            {
                categoriesHome.map((category) => (
                    <DisplayCategory category={category} key={category.id}/>
                ))
            }
        </Grid>
    </Grid>
  )
}
