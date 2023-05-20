import { Grid, Typography } from "@mui/material"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUserStore } from "../../../hooks/useUserStore"
import { DisplayIntersts } from "./DisplayIntersts";


export const UserDetails = () => {

    const { startLoadinguserdetails } = useUserStore();

    useEffect(() => {
        startLoadinguserdetails();
    },[]);

    const { user, status } = useSelector( state => state.user );

  return (
    <>
    {
        status == 'completed'?
            <Grid
                item
                sx={{
                    display: 'flex',
                    justifyContent: {xs: 'start'},
                    flexDirection: 'column',
                    alignContent: 'center',
                    flexWrap: 'wrap',
                    mt: 3,
                    width: {xs:'100%', md:'50%'},
                    boxShadow: 3,
                    borderRadius: '10px',
                    padding: 2
                }}
            >
                <Typography 
                    variant='h6' 
                    sx={{
                        fontWeight: 400, 
                        fontStyle: 'italic', 
                        color: '#919191', 
                        display: 'block', 
                        width: '100%',
                        textAlign: 'center'
                }}>
                        User details
                    </Typography>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        justifyContent: {xs:'start'},
                        flexWrap: 'wrap',
                        marginY: 1,
                        width: '100%'
                    }}
                >
                    <Grid><b>Email Address </b>{user.email}</Grid>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        justifyContent: {xs:'start'},
                        flexWrap: 'wrap',
                        mb: 1,
                        width: '100%'
                    }}
                >
                    <Grid><b>Name </b>{user.full_name}</Grid>
                </Grid>
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: {xs:'start'},
                        flexWrap: 'wrap',
                        marginY: 2,
                        width: '100%'
                    }}
                >
                    <Typography variant= 'body1' sx={{fontWeight: 600, display: 'flex', width: '100%'}}>
                        My Interests
                    </Typography>
                    <Grid
                        item
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '100%'
                        }}
                    >
                        {
                            user.interests == undefined ?
                                <></>
                            :
                                user.interests.map((interest) => {
                                    return (
                                        <DisplayIntersts key={interest.id} item={interest}/>
                                    )
                                })
                        }
                    </Grid>
                </Grid>
            </Grid>
        :
            <>
            </>
    } 
    </>
  )
}


