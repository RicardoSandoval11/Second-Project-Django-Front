import { BlogLayout } from '../../layouts/BlogLayout';
import { Grid, TextField, Typography, Link, Button, Alert } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const ForgotPassword = () => {

    const { startChecking, startRequestUpdateEmail, startClearingMessages } = useAuthStore();

    const { status, resestPasswordRequestSuccessMsg, resestPasswordRequestFailedMsg } = useSelector( state => state.auth );

    const initialErrors = {
        email: null
    };

    const [ email, setEmail ] = useState('');
    const [ errors, setErrors ] = useState(initialErrors);

    /* Form Validation */

    const onEmailChange = (event) => {
        if(event.target.value.trim().includes(' ')){
            errors.email = 'Email cannot contains spaces';
        }else if(!event.target.value.includes('@')){
            errors.email = 'Email must contains the character @';
        }else if(!event.target.value.includes('.')){
            errors.email = 'Email does not seem to have a valid domain';
        }else {
            errors.email = null;
        }
        setEmail(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (errors.email == null) {
            startChecking();
        }
    }

    const onSendingEmail = () => {
        if (errors.email == null) {
            startRequestUpdateEmail(email);
        }
    }

    useEffect(() => {

        if(resestPasswordRequestSuccessMsg != null){
            Swal.fire('Email Sent', resestPasswordRequestSuccessMsg, 'success');
            startClearingMessages();
            setEmail('');
        }

    },[resestPasswordRequestSuccessMsg]);

    useEffect(() => {

        if(resestPasswordRequestFailedMsg != null){
            Swal.fire('Send Email Failed', resestPasswordRequestFailedMsg, 'error');
            startClearingMessages();
        }

    },[resestPasswordRequestFailedMsg]);

  return (
    <BlogLayout>
      <Grid
      container
        sx={{
            backgroundColor: 'secondary.main',
            height: '100vh',
            display:'flex',
            justifyContent:'center',
            alignItems: 'center'
        }}
      >
        <Grid
            item
            sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: 3,
                padding: 2,
            }}
            xs={11} 
            sm={9} 
            md={5} 
            lg={4} 
            xl={3}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Typography variant='h5' sx={{ mb: 1 }}>
                Forgot Password
            </Typography>
            <form 
                onSubmit={onSubmit}
            >
                <Grid container>
                    <Grid 
                        container
                        display= {errors.email != null ? '': 'none'}
                        sx={{ mt: 1 }}
                    >
                        <Grid 
                            item 
                            xs={ 12 } 
                            sm={ 12 }
                        >
                            <Alert severity='error'>
                            {errors.email}
                            </Alert>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label = 'Email'
                            type= 'email'
                            placeholder='Email'
                            fullWidth
                            name='email'
                            onChange={onEmailChange}
                            value={email}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx= {{ mb: 2, mt: 1, display:'flex', justifyContent:'center' }}>
                    <Grid item 
                        xs={6} 
                    >
                        <Button 
                        type='submit' 
                        variant='contained' 
                        fullWidth
                        onClick={onSendingEmail}
                        disabled={status == 'checking'}
                        >
                        Next 
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Grid item><Link to='/auth/login' component={RouterLink}>Sign In</Link></Grid>
                <Grid item><Link to='/auth/register' component={RouterLink}>Create Account</Link></Grid>
            </Grid>
        </Grid>
      </Grid>
    </BlogLayout>
  )
}

