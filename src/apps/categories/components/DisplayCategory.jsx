import { ListItem, ListItemText, Typography, Link, Grid } from '@mui/material';

export const DisplayCategory = ({category}) => {

  return (
    <Grid 
        sx={{
            backgroundColor: 'primary.main',
            alignItems:"flex-start",
            margin: 1,
            boxShadow: 3,
            borderRadius: '10px',
            color: 'white',
            padding: 2
        }}
        className='animate__fadeIn'
    >
    <Typography variant='h4'>{category.name}</Typography>
        <Typography
            sx={{ display: 'block', marginY:1}}
            component="span"
            variant="body2"
            color="white"
        >
            <b>Description </b>
        </Typography>
        <Typography sx={{color:'white', display: 'block', fontSize:'14px', mb:2}}>
            {category.description.length > 200 ? category.description.slice(0,200)+'...' : category.description}
        </Typography>
        <Typography sx={{color:'white', display: 'block', fontSize:'14px'}}>
            {`Total Entries: ${category.number_of_entries}`}
        </Typography>
        <Grid 
        >
            <Link 
                href={`/entries/filter-category/${category.id}`}
                sx={{
                    color: 'white',
                    display: 'block',
                    textAlign: 'end',
                    marginY: 2
                }}
            >
                View Entries
            </Link>
        </Grid>
  </Grid>
  )
}

