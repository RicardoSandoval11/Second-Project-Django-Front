import { Grid } from '@mui/material'


export const DisplayIntersts = ({item}) => {
  return (
    <Grid
        item
        sx={{
            width: '100%',
            marginY: 1
        }}
    >
      {item.name}
    </Grid>
  )
}

