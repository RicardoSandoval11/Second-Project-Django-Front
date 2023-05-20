import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useUserStore } from '../../../hooks/useUserStore';

import { BlogLayout } from '../../layouts/BlogLayout';
import { DashBoardActions } from '../components/DashBoardActions';
import { Entries } from '../components/Entries';
import { UserDetails } from '../components/UserDetails';


export const Userdashboard = () => {

  const { startClearingMessages } = useUserStore();

  const { successInformationUpdatedMsg } = useSelector( state => state.user );

  useEffect(() => {

    if(successInformationUpdatedMsg != null){
      Swal.fire('Information Updated', successInformationUpdatedMsg, 'success');
      startClearingMessages();
    }
  },[successInformationUpdatedMsg]);

  return (
    <BlogLayout>
      <Grid
        container
        sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: 1400,
            marginX: 'auto',
            padding: 4
        }}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid
            item
            sx={{
                display: 'flex',
                justifyContent: {xs: 'center', md:'start'},
                marginY: 2,
                width: '100%'
            }}
        >
            <Typography variant='h4' sx={{fontWeight: 600, fontStyle: 'italic'}}>My Dashboard</Typography>
        </Grid>
        <Grid
            item
            sx={{
                display: 'flex',
                justifyContent: {xs: 'center', md:'end'},
                marginY: 2,
                width: '100%'
            }}
        >
            <DashBoardActions/>
        </Grid>

        <UserDetails/>
        
        <Entries/>
      </Grid>
    </BlogLayout>
  )
}


