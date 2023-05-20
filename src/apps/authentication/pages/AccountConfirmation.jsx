import { BlogLayout } from '../../layouts/BlogLayout';
import { Grid, TextField, Typography, Alert, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import  Swal  from 'sweetalert2';

export const AccountConfirmation = () => {

    // Getting state values
    const { status, registerMsg, verifyErrorMsg } = useSelector( state => state.auth );

    // url params
    const { id } = useParams();

    // form validation 

    const [ code, setCode ] = useState('');
    const [ error, setError ] = useState(null);

    const onCodeFieldChange = (event) => {

        if(event.target.value.length != 6){
            setError('Invalid Code');
        }else{
            setError(null);
        }
        setCode(event.target.value);
    }

    const { startVerifyingUserAccount, startChecking } = useAuthStore();


    const onSubmit = (event) => {
        event.preventDefault();
        startChecking();
    }

    // Verify code
    const onStartVerifyAccount = () => {

        startVerifyingUserAccount(id, code);

    }

    useEffect(() => {
        if(verifyErrorMsg != null){
            Swal.fire('Verification Error', verifyErrorMsg.payload, 'error');
        }
    },[verifyErrorMsg]);


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
                Account Confirmation
            </Typography>
            <Grid display = {registerMsg == null ? 'none' : ''}>
                <Alert  severity="success">
                    {registerMsg?.payload}
                </Alert>
            </Grid>
            <form 
                onSubmit={onSubmit}
            >
                <Grid container>
                    <Grid 
                        container
                        display= {error != null ? '': 'none'}
                        sx={{ mt: 1 }}
                    >
                        <Grid 
                            item 
                            xs={ 12 } 
                            sm={ 12 }
                        >
                            <Alert severity='error'>
                            {error}
                            </Alert>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label = 'Code'
                            type= 'text'
                            placeholder='Code Verification'
                            fullWidth
                            name='code'
                            onChange={onCodeFieldChange}
                            value={code}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx= {{ mb: 2, mt: 1, display:'flex', justifyContent:'center' }}>
                    <Grid item 
                        xs={12}
                        sm={12} 
                        md={8} 
                        lg={6} 
                        xl={4} 
                    >
                        <Button 
                        type='submit' 
                        variant='contained' 
                        fullWidth
                        onClick={onStartVerifyAccount}
                        disabled={status == 'checking'}
                        >
                        Verify 
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
      </Grid>
    </BlogLayout>
  )
}

