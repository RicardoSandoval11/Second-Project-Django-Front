import { BlogLayout } from "../../layouts/BlogLayout";
import { Grid } from '@mui/material';
import { CategoriesSection } from "../componenets/CategoriesSection";
import { LastCreatedSection } from "../componenets/LastCreatedSection";
import { MostFavoritesSection } from "../componenets/FavoritesSection";
import { EntriesByInterests } from "../componenets/EntriesByInterests";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useEntryStore } from "../../../hooks/useEntryStore";


export const HomePage = () => {

  const { status } = useSelector( state => state.auth );

  const { createEntrySucessMsg, createEntryFailedMsg, updateEntrySuccessMsg, updateEntryFailedMsg } = useSelector( state => state.entry );

  const { startResetMessages } = useEntryStore();

  useEffect(() => {
    if(createEntrySucessMsg != null){
      Swal.fire('New Entry Added', 'Entry created successfully','success');
      startResetMessages();
    }
  },[createEntrySucessMsg]);

  useEffect(() => {
    if(createEntryFailedMsg != null){
      Swal.fire('New Entry Added Falied', 'Entry could not be created','error');
      startResetMessages();
    }
  },[createEntryFailedMsg]);

  useEffect(() => {
    if(updateEntrySuccessMsg != null){
      Swal.fire('Entry Updated', 'Entry updated successfully','success');
      startResetMessages();
    }
  },[updateEntrySuccessMsg]);

  useEffect(() => {
    if(updateEntryFailedMsg != null){
      Swal.fire('Update Entry Failed', 'Entry could not be updated','error');
      startResetMessages();
    }
  },[updateEntryFailedMsg]);

  return (
    <BlogLayout>
      <Grid
        className="animate__animated animate__fadeIn animate__faster"
        container
        spacing={2}
        sx={{
          backgroundColor: 'white',
          display:'flex',
          flexDirection:'row',
          flexWrap:'wrap',
          padding:3,
          justifyContent:'center',
          maxWidth:1500,
          marginX:'auto'

        }}
      >
        {/* Available categories Section */}
        <CategoriesSection/>
        {/* Last Created Entries Section */}
        <LastCreatedSection/>
        {/* Most Popular Entries Section */}
        <MostFavoritesSection/>
        {/* Entries By Interests */}
        {
          status == 'authenticated'?
            <EntriesByInterests/>
          :
            <></>
        }
      </Grid>
    </BlogLayout>
  )
}


