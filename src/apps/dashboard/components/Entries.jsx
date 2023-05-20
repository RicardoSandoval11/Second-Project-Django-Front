import { Grid, Typography, Button } from "@mui/material"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../hooks/useUserStore"
import { DisplaySimpleEntry } from "./DisplaySimpleEntry";


export const Entries = () => {

    const navigate = useNavigate();

    const { startloadingUserDetailsdashboard } = useUserStore();

    useEffect(() => {
        startloadingUserDetailsdashboard();
    },[]);

    const { userEntries, status } = useSelector( state => state.user );

    const redirectMyEntries = () => {
        navigate('/entries/my-entries');
      }

  return (
    <Grid
        item
        sx={{
            display: 'flex',
            justifyContent: {xs: 'center', md:'start'},
            flexWrap: 'wrap',
            mt: 3,
            width: {xs:'100%', md: '47%'},
            boxShadow: 3,
            borderRadius: '10px',
            marginLeft: {xs: 0, md: 2},
            padding: 1
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
            My Entries
        </Typography>
        <Grid
            container
            sx={{
                display: 'flex',
                width: '100%'
            }}
        >
            {
                status == 'checking' ?
                    <></>
                :
                    userEntries.map((entry) => {
                        return (
                            <DisplaySimpleEntry key={entry.id} entry={entry}/>
                        )
                    })
            }
        </Grid>
        <Button 
            sx={{marginY: 2, marginX: 'auto'}}
            variant='contained'
            onClick={redirectMyEntries}
        >
            View All
        </Button>
    </Grid>
)
}

