import { Button } from "@mui/material"
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';

export const DashBoardActions = () => {

  const navigate = useNavigate();

  const { user } = useSelector( state => state.user );

  const redirectUpdateInformation = () => {
    navigate(`/update-account/${user.id}`);
  }

  const redirectCreationEntry = () => {
    navigate('/entries/edition-entry');
  }


  return (
    <>
      <Button variant="contained" sx={{m:1}} onClick={redirectCreationEntry}>
        Create a New Entry
      </Button>
      <Button variant="contained" sx={{m:1}} onClick={redirectUpdateInformation}>
        Update My Information
      </Button>
    </>
  )
}

