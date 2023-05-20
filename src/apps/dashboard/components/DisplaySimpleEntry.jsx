import { Grid, Box } from "@mui/material"


export const DisplaySimpleEntry = ({entry}) => {


  return (
    <Grid
        item
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            marginY: 2
        }}
    >
      <Box
        component='img'
        sx={{
            display: 'flex',
            width: '30%'
        }}
        alt={entry.title}
        src={entry.image}
      />
      <Grid
        item
        sx={{
            display: 'flex',
            width: '67%',
            flexWrap: 'wrap',
            marginLeft: 1
        }}
      >
        <Grid sx={{width: '100%'}}><b>Title </b>{entry.title}</Grid>
        <Grid sx={{width: '100%'}}><b>Creation date </b>{entry.created}</Grid>
      </Grid>
    </Grid>
  )
}


