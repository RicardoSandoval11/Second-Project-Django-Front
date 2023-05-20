import {Header} from '../includes/Header';
import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';


export const BlogLayout = ({children}) => {
  return (
    <Box
        sx={{display: 'flex'}}
    >
      {/* Header */}
      <Header/>

      {/* Content */}
      <Box
        component='main'
        sx={{ flexGrow: 1 }}
      >
        <Toolbar/>
        { children }
      </Box>
      
    </Box>
  )
}


