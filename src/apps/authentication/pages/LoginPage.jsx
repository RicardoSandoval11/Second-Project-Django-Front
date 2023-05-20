import { Grid, TextField, Typography, Link, Button, Alert } from '@mui/material';
import { BlogLayout } from '../../layouts/BlogLayout';
import {Link as RouterLink} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


export const LoginPage = () => {

    const { startLoginUser, startClearingMessages } = useAuthStore();

    const { status, verifyMsg, loginMsg,changePasswordSuccessMsg, changePasswordFailedMsg } = useSelector( state => state.auth );

    const initialErrors = {
        email: null,
        password: null
    };

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
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

    const onPasswordChange = (event) => {
        if(event.target.value.trim().length <= 8){
            errors.password = 'Password must contains more than 8 characters';
        }else {
            errors.password = null;
        }

        setPassword(event.target.value);
    }

    const onSubmit = ( event ) => {
        event.preventDefault();
    }

    const onCredentialsSignIn = () => {
        if (errors.email == null && errors.password == null) {
            startLoginUser(email, password);
        }
    }

    // Update password messages
    useEffect(() => {

        if(changePasswordSuccessMsg != null){
            Swal.fire('Password Updated', changePasswordSuccessMsg, 'success');
            startClearingMessages();
        }

    },[changePasswordSuccessMsg]);

    useEffect(() => {

        if(changePasswordFailedMsg != null){
            Swal.fire('Password Update Failed', changePasswordFailedMsg, 'error');
            startClearingMessages();
        }

    },[changePasswordFailedMsg]);
    
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
                Login
            </Typography>
            <Grid display = {verifyMsg == null ? 'none' : ''}>
                <Alert  severity="success">
                    {verifyMsg}
                </Alert>
            </Grid>
            <Grid 
                item 
                xs={ 12 } 
                sm={ 12 }
                display={loginMsg != null ? '' : 'none'}
            >
                <Alert severity='error'>
                {loginMsg}
                </Alert>
            </Grid>
            <form 
                onSubmit={onSubmit}
            >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label = 'Email'
                            type= 'email'
                            placeholder='Email'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onEmailChange}
                        />
                    </Grid>
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
                            label = 'Password'
                            type= 'password'
                            placeholder='Password'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onPasswordChange}
                        />
                    </Grid>
                    <Grid 
                        container
                        display= {errors.password != null ? '': 'none'}
                        sx={{ mt: 1 }}
                    >
                        <Grid 
                            item 
                            xs={ 12 } 
                            sm={ 12 }
                        >
                            <Alert severity='error'>
                            {errors.password}
                            </Alert>
                        </Grid>
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
                        onClick={onCredentialsSignIn}
                        disabled={status == 'checking'}
                        >
                        Sign In
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Grid item><Link to='/auth/register' component={RouterLink}>Create Account</Link></Grid>
                <Grid item><Link to='/auth/forgot-password' component={RouterLink}>¿Forgot Password?</Link></Grid>
            </Grid>
        </Grid>
      </Grid>
    </BlogLayout>
  )
}

