import { Grid, Alert, AlertTitle } from "@mui/material"


export const NoResults = () => {
  return (
    <Grid
        container
        sx={{
            display:'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
      <Alert severity="info">
        <AlertTitle>No Matches Found</AlertTitle>
      </Alert>
    </Grid>
  )
}


