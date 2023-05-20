import { Grid, Link } from '@mui/material';

export const DisplayCategory = ( {category} ) => {
    

  return (
    <Grid 
        item
        xs={5}
        md={3}
        lg={2}
        sx={{
            backgroundColor:'white',
            border: 1,
            borderColor: 'secondary.main',
            borderRadius: '8px',
            padding: 1,
            color: 'black',
            fontWeight: '600',
            marginY: 1,
            marginX: 1
        }}
    >
        <Link 
            sx={{
                ':hover':{
                    opacity: 0.8
                },
                padding: 2,
                color:'black',
                textDecoration: 'none',
                diplay: 'flex',
                justifyContent: 'center'
            }}
            href={`/entries/filter-category/${category.id}`}
            
        >
            {category.name}
        </Link>
    </Grid>
  )
}


