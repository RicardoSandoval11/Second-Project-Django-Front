import { AppBar, IconButton, Toolbar, Grid, Typography, Link } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import TemporaryDrawer from './SideMenu';

export const Header = () => {

    
  return (
    <AppBar
        position='fixed'
        sx={{
            width: { sm: '100%' }
        }}
    >
      <Toolbar>
            <TemporaryDrawer/>
            <Grid container directiont='row' justifyContent='space-between' alignItems='center'>
            <Link variant='h6'  sx={{ color: 'white' }} to='/' component={RouterLink}>
                BlogApp
            </Link>
            </Grid>
      </Toolbar>
    </AppBar>
  )
}

