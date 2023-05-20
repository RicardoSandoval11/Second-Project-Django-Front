import { BlogLayout } from '../../layouts/BlogLayout';
import { Grid, TextField, Typography, Link, Button, Alert } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useSelector } from 'react-redux';
import { specialCharvalidation } from '../../../helpers/specialCharvalidation';
import  Swal  from 'sweetalert2';

export const RegisterPage = () => {

    const {startChecking, startRegisterUser} = useAuthStore();
    const { status, registerErrorMsg } = useSelector(state => state.auth);

    // Form validation
    const initalErrorsState = {
        name : null,
        email : null,
        password : null
    };

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[passwordConfirmation, setPasswordConfirmation] = useState('');
    
    const [errors, setErrors] = useState(initalErrorsState);

    const onNameChange = (event) => {
        
        if(event.target.value.length <= 1){
            errors.name = 'Name cannot be empty';
        }else if(specialCharvalidation(event.target.value)){
            errors.name = 'Name cannot contains special characters';
        }else{
            errors.name = null;
        }
        setName(event.target.value);
    }

    const onEmailChange = (event) => {
        if(!event.target.value.includes("@")){
            errors.email = 'Email must contain @';
        }else if(!event.target.value.includes(".")){
            errors.email = 'Email must have a valid domain';
        }else {
            errors.email = null;
        }
        setEmail(event.target.value);
    }

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

    // Handle Form submit

    const onSubmit = (event) => {
        event.preventDefault();
        startChecking();
    }

    // Start Registering process

    const onStartRegisterProccess = () => {
        startRegisterUser(name, email, password);
    }

    useEffect(() => {
        if(registerErrorMsg != null){
            Swal.fire('Register Error', registerErrorMsg.payload, 'error');
        }
    },[registerErrorMsg]);

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
                Create Account
            </Typography>
            <form 
                onSubmit={onSubmit}
            >
                <Grid container>
                    <Grid 
                        container
                        display= {errors.name != null ? '': 'none'}
                        sx={{ mt: 1 }}
                    >
                        <Grid 
                            item 
                            xs={ 12 } 
                            sm={ 12 }
                        >
                            <Alert severity='error'>
                            {errors.name}
                            </Alert>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label = 'Name'
                            type= 'text'
                            placeholder='Jhon Doe'
                            fullWidth
                            name='full_name'
                            onChange={onNameChange}
                            value={name}
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
                            label = 'Email'
                            type= 'email'
                            placeholder='Email'
                            fullWidth
                            name='email'
                            onChange={onEmailChange}
                            value={email}
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
                        disabled={status == 'checking'}
                        onClick={onStartRegisterProccess}
                        >
                        Create Account
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Grid item><Link to='/auth/login' component={RouterLink}>Sign In</Link></Grid>
                <Grid item><Link to='/auth/forgot-password' component={RouterLink}>¿Forgot Password?</Link></Grid>
            </Grid>
        </Grid>
      </Grid>
    </BlogLayout>
  )
}
