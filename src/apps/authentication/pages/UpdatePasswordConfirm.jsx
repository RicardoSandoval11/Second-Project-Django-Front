import { BlogLayout } from '../../layouts/BlogLayout';
import { Grid, TextField, Typography, Link, Button, Alert } from '@mui/material';
import {Link as RouterLink, useParams} from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Checking } from '../../../ui/Checking';

export const UpdatePasswordConfirm = () => {

    const { startChecking, startChangingPassword, startVerifyingCode } = useAuthStore();

    // Validate the code

    const { code } = useParams();

    useEffect(() => {
        startVerifyingCode(code);
    },[]);


    const { status, changePasswordCodeStatus } = useSelector( state => state.auth );

    const initialErrors = {
        password: null
    };

    const[password, setPassword] = useState('');
    const[passwordConfirmation, setPasswordConfirmation] = useState('');
    
    const [errors, setErrors] = useState(initialErrors);

    /* Form Validation */

    const onPasswordChange = (event) => {
        if(event.target.value.length < 8){
            errors.password = 'Password must contain more than 8 characters';
        }else{
            errors.password = null;
        }
        setPassword(event.target.value);
    }

    const onPassValidationChange = (event) => {
        setPasswordConfirmation(event.target.value);
        if(event.target.value != password){
            errors.password = 'Passwords are different';
        }else{
            errors.password = null;
        }
        
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (errors.email == null) {
            startChecking();
        }
    }

    const onSendingNewPassword = () => {
        if (errors.password == null) {
            startChangingPassword(code, password);
        }
    }

    

  return (
    <BlogLayout>
        {
            changePasswordCodeStatus == null ?
                <Checking/>
            :
                changePasswordCodeStatus?
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
                                    <Grid item xs={12} sx={{ mt: 2 }}>
                                        <TextField
                                            label = 'Password'
                                            type= 'password'
                                            placeholder='Password'
                                            fullWidth
                                            name='password'
                                            onChange={onPasswordChange}
                                            value={password}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mt: 2 }}>
                                        <TextField
                                            label = 'Confirm Password'
                                            type= 'password'
                                            placeholder='Confirm password'
                                            fullWidth
                                            name='password2'
                                            onChange={onPassValidationChange}
                                            value={passwordConfirmation}
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
                                        onClick={onSendingNewPassword}
                                        disabled={status == 'checking'}
                                        >
                                        Update 
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                :
                    <Grid
                        container
                        sx={{
                            height: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Alert severity="error">Invalid Code</Alert>
                    </Grid>
        }
    </BlogLayout>
  )
}

