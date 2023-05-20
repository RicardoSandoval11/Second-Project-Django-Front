import { BlogLayout } from "../../layouts/BlogLayout";
import { Grid, Typography, Box } from '@mui/material';
import parse from 'html-react-parser';
import { DisplayTag } from "./DisplayTags";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useEntryStore } from "../../../hooks/useEntryStore";
import { Checking } from "../../../ui/Checking";

export const EntryDetails = () => {

  const { startLoadingDetailsEntry } = useEntryStore();

  // url params
  const { id } = useParams();

  useEffect(() => {
    startLoadingDetailsEntry(id);
  },[]);

  const { detailEntry, status } = useSelector( state => state.entry );

    return (
      <>
      {
        status != 'completed' ?
          <BlogLayout>
            <Checking/>
          </BlogLayout>
        :
        <BlogLayout>
        <Grid
        className="animate__animated animate__fadeIn animate__faster"
        container
        spacing={2}
        sx={{
          maxWidth:1000,
          display:'flex',
          marginX:'auto'
        }}
        >
        <Grid item xs={12} sx={{m: 2}}>
          <Typography variant="h3" textAlign='center'>
            {detailEntry?.title}
          </Typography>
        </Grid>
        <Grid
          item xs={12} sx={{ m:2, display:'flex', justifyContent: 'center' }}
        >
            <Box
            component="img"
            sx={{
              width: '70%',
              maxWidth: { xs: 500, md: 1000 },
              borderRadius: '10px'
            }}
            alt={detailEntry?.title}
            src={detailEntry?.image}
          />
        </Grid>
        <Grid item xs={6} sx={{mx: 3}}>
          <Typography variant="subtitle1" textAlign='start'>
          {'Created: '+detailEntry?.created}
          </Typography>
          <Typography variant="subtitle1" textAlign='start'>
          {'Last update: '+ detailEntry?.modified}
          </Typography>
          <Typography variant="subtitle1" textAlign='start'>
          {'Created by: '+ detailEntry?.user.full_name}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{mx: 3, mb:4, fontSize:20}}>
            {parse(detailEntry?.content)}
        </Grid>
        <Grid item container xs={12} sx={{ display: 'flex', mx:3, justifyContent:'start' }}>
              <Grid item xs={12}>
                <Typography variant="h5">Tags:</Typography>
              </Grid>
              <Grid item xs={8} sx={{ display:'flex', justifyContent:'start',mt:2 }}>
                  {
                    detailEntry?.tags.map((tag) => (
                      <DisplayTag tag={tag} key={tag.id}/>
                      ))
                  }
              </Grid>
        </Grid>
      </Grid>
    </BlogLayout>
      }
    </>
    )
}


