import { Grid, Typography, TextField, Button, Alert } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BlogLayout } from '../../layouts/BlogLayout';
import { specialCharvalidation } from '../../../helpers/specialCharvalidation';
import { useInterestStore } from '../../../hooks/useInterestStore';
import { useUserStore } from '../../../hooks/useUserStore';

// select multiple
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

export const UpdateInformation = () => {

    const { id } = useParams();

    const { startLoadingAllInterests } = useInterestStore();

    const { startRetriveuserDetails, startUpdatingUserInformation } = useUserStore();

    useEffect(() => {
        startLoadingAllInterests();
        startRetriveuserDetails(id);
    },[]);

    const { allInterests, status } = useSelector( state => state.interest );

    const { userUpdate, status: userStatus } = useSelector( state => state.user );

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };


    const [interests, setInterests] = useState([]);


    const MultipleSelectChip = () => {
        
    const handleInterestChange = (event) => {
        setInterests(event.target.value);
    };

    return (
        <div>
            {status === 'searching' || userUpdate.interests === undefined ? (
            <></>
            ) : (
            <FormControl sx={{ marginX: 'auto' }} fullWidth>
                <InputLabel id="demo-multiple-chip-label">Interests</InputLabel>
                <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={interests}
                onChange={handleInterestChange}
                input={<OutlinedInput id="select-multiple-chip" label="Interests" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                    ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                >
                {allInterests.map((interest) => (
                    <MenuItem key={interest.id} value={interest}>
                    {interest.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            )}
        </div>
        );
    }

    const initialErrors = {
    fullname: null,
    email: null
    };

    const [errors, setErrors] = useState(initialErrors);

    useEffect(() => {
        if(userUpdate.full_name != undefined){
            setFullName(userUpdate.full_name);
        }
    },[userUpdate.full_name]);

    useEffect(() => {
        if(userUpdate.email != undefined){
            setEmail(userUpdate.email);
        }
    },[userUpdate.email]);

    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');

    // hanlde input values change
    const onEmailChange = (event) => {
        if(!event.target.value.includes('@')){
            errors.email = 'Email must contain @';
        }else if(!event.target.value.includes('.')){
            errors.email = 'Email must have a domain';
        }else{
            errors.email = null;
        }
        setEmail(event.target.value);
    }

    const onfullNameChange = (event) => {
        if (event.target.value.length < 3) {
            errors.fullname = 'Name is to short';
        }else if(specialCharvalidation(event.target.value)){
            errors.fullname = 'Name cannot contain special characters';
        }else {
            errors.fullname = null;
        }
        setFullName(event.target.value);
    }

    const onSubmitUpdateForm = (event) => {
        event.preventDefault();
    }

    const onUpdatingInformation = () => {

        if(errors.fullname == null && errors.email == null){

            let updatedInterests = [];

            interests.map(item => {
                updatedInterests.push(item.id);
                return item;
            });

            const updatedInformation = {
                full_name : fullname,
                email : email,
                interests : updatedInterests
            }
            startUpdatingUserInformation(updatedInformation, userUpdate.id);
        }

    }


  return (
    <BlogLayout>
      <Grid
        container
        sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            alignItems: 'center',
            maxWidth: 1400,
            marginX: 'auto'
        }}
      >
        <Grid
            item
            xs={12} 
            sm={7} 
            md={5} 
            lg={4} 
            sx={{
                boxShadow: 3,
                borderRadius: '10px',
                padding: 3,
            }}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid
                item
                sx={{
                    marginY: 2,
                    textAlign: 'start',
                    width: '100%'
                }}
            >
                <Typography
                    variant='body1'
                    sx={{
                        color: 'primary.main',
                        fontWeight: 600,
                        fontStyle: 'italic',
                        fontSize: '20px'
                    }}
                >
                    Update My Information
                </Typography>
            </Grid>
            {
                userStatus == 'checking' ?
                    <></>
                :
                    <form onSubmit={onSubmitUpdateForm}>
                        <Grid
                            container
                        >
                            <Grid 
                                container
                                display= {errors.fullname != null ? '': 'none'}
                                sx={{ marginY: 2 }}
                            >
                                <Alert severity='error' sx={{width: '100%'}}>
                                {errors.fullname}
                                </Alert>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{mb:2}}
                            >
                                <TextField 
                                    id="full_name" 
                                    label="Full Name" 
                                    variant="outlined" 
                                    type='text'
                                    fullWidth
                                    onChange={onfullNameChange}
                                    value={fullname}
                                />
                            </Grid>
                            <Grid 
                                container
                                display= {errors.email != null ? '': 'none'}
                                sx={{ marginY: 2 }}
                            >
                                <Alert severity='error' sx={{width: '100%'}}>
                                {errors.email}
                                </Alert>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{mb:2}}
                            >
                                <TextField 
                                    id="email" 
                                    label="Email" 
                                    variant="outlined" 
                                    type='email'
                                    fullWidth
                                    onChange={onEmailChange}
                                    value={email}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <MultipleSelectChip/>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginY: 1
                            }}
                        >
                            <Button variant='contained' onClick={onUpdatingInformation}>Update</Button>
                        </Grid>
                    </form>
            }
        </Grid>
      </Grid>
    </BlogLayout>
  )
}

