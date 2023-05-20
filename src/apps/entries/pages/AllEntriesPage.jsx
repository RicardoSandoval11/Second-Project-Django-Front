import { useEffect, useState } from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Typography, TextField, Button, MenuItem, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useSelector } from "react-redux";

import { BlogLayout } from "../../layouts/BlogLayout";
import { Checking } from "../../../ui/Checking";
import { Entry } from "../components/Entry";
import { useEntryStore } from "../../../hooks/useEntryStore"
import { useCategoryStore } from "../../../hooks/useCategoryStore";
import { useInterestStore } from "../../../hooks/useInterestStore";
import { useTagStore } from "../../../hooks/useTagStore";
import { maxWidth } from "@mui/system";


export const AllEntriesPage = () => {

  const { startLoadingFilteredEntries } = useEntryStore();
  const { startLoadingCategories } = useCategoryStore();
  const { startLoadingAllInterests } = useInterestStore();
  const { startLoadingAllTags } = useTagStore();
  
  useEffect(() => {
    startLoadingCategories();
    startLoadingAllInterests();
    startLoadingAllTags();
    startLoadingFilteredEntries('', '', '', '', '', null, null, null, null);
  },[]);

  // Get data
  const { allCategories } = useSelector( state => state.category );
  const { allInterests } = useSelector( state => state.interest );
  const { allTags } = useSelector( state => state.tag );

  // On change values
  const [title, setTitle] = useState('');

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const [content, setContent] = useState('');

  const onContentChange = (event) => {
    setContent(event.target.value);
  }

  const [category, setCategory] = useState('');

  const onChangeCategory = (event) => {
    setCategory(event.target.value);
  }

  const [interest, setInterest] = useState('');

  const onInterestChange = (event) => {
    setInterest(event.target.value);
  }

  const [tag, setTag] = useState('');

  const onTagChange = (event) => {
    setTag(event.target.value);
  }

  const [startDate, setStartDate] = useState(null);

  const onStartDateChange = (event) => {
    setStartDate(event.$d)
  }

  const [endDate, setEndDate] = useState(null);

  const onEndDateChange = (event) => {
    setEndDate(event.$d);
  }

  const onSubmitFilter = (event) => {
    event.preventDefault();
  }

  const onLoadFilters = () => {
    startLoadingFilteredEntries(title, content, category, interest, tag, startDate, endDate, null, null);
  }

  const onPressPrevious = () => {
    startLoadingFilteredEntries(title, content, category, interest, tag, startDate, endDate, previous, null);

  }

  const onPressNext = () => {
    startLoadingFilteredEntries(title, content, category, interest, tag, startDate, endDate, null, next);
  }

  const { filteredEntries, status, next, previous } = useSelector(state => state.entry);


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
          maxWidth:1400,
          marginX:'auto'

        }}
      >
        <Grid item xs={12} marginY={1} sx={{ marginX:2 }}>
          <Typography 
            sx={{
              padding:1,
              fontSize: {xs: '40px', md: '50px'},
              fontWeight: 600,
              textAlign: {xs: 'center', md: 'start'} 
            }}
          >
            Articles
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography variant="body1" sx={{color: '#919192'}}>Filter Entries</Typography>
          <form onSubmit={onSubmitFilter}>
            <Grid
              container
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: {xs:'column', sm: 'row'},
                justifyContent: 'space-between',
                flexWrap: 'wrap'
              }}
            >
              <Grid 
                item 
                sx={{ 
                    mt: 2,
                    width:{xs:'100%', sm: '47%'},
                    marginX: {sm: 1}
                }}
              >
                  <TextField
                      label = 'Title'
                      type= 'text'
                      size="small"
                      placeholder='Filter by title'
                      fullWidth
                      name='title'
                      onChange={onTitleChange}
                      value={title}
                  />
              </Grid>
              <Grid 
                item 
                sx={{ 
                    mt: 2,
                    width:{xs:'100%', sm: '47%'},
                    marginX: {sm: 1}
                }}
              >
                  <TextField
                      label = 'Content'
                      type= 'text'
                      size="small"
                      placeholder='Filter by content'
                      fullWidth
                      name='content'
                      onChange={onContentChange}
                      value={content}
                  />
              </Grid>
              <Grid 
                item 
                sx={{ 
                    mt: 2,
                    width:{xs:'100%', sm: '47%',md:'30%'},
                    marginX: {sm: 1}
                }}
              >
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    label="Filter by category"
                    onChange={onChangeCategory}
                    value={category}
                  >{
                      allCategories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))
                  }
                </TextField>
              </Grid>
              <Grid 
                item 
                sx={{ 
                    mt: 2,
                    width:{xs:'100%', sm: '47%',md:'30%'},
                    marginX: {sm: 1}
                }}
              >
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    label="Filter by Interests"
                    onChange={onInterestChange}
                    value={interest}
                  >{
                      allInterests.map((interest) => (
                        <MenuItem key={interest.id} value={interest.id}>
                          {interest.name}
                        </MenuItem>
                      ))
                  }
                </TextField>
              </Grid>
              <Grid 
                item 
                sx={{ 
                    mt: 2,
                    width:{xs:'100%',md:'30%'},
                    marginX: {sm: 1}
                }}
              >
                  <TextField
                    id="outlined-select-currency"
                    select
                    fullWidth
                    label="Filter by tag"
                    onChange={onTagChange}
                    value={tag}
                  >{
                      allTags.map((tag) => (
                        <MenuItem key={tag.id} value={tag.id}>
                          {tag.name}
                        </MenuItem>
                      ))
                  }
                </TextField>
              </Grid>
              <Grid 
                item 
                sx={{ 
                    mt: 2,
                    width:{xs:'100%', sm: '47%'},
                    marginX: {sm: 1},
                    display:'flex',
                    justifyContent: {xs: 'center', sm: 'end'}
                }}
              >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      label="Start Date" 
                      onChange={onStartDateChange}
                    />
                  </LocalizationProvider>
              </Grid>
              <Grid 
                item 
                sx={{ 
                    mt: 2,
                    width:{xs:'100%', sm: '47%'},
                    marginX: {sm: 1},
                    display:'flex',
                    justifyContent: {xs: 'center', sm: 'start'}
                }}
              >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      label="End Date" 
                      onChange={onEndDateChange}
                    />
                  </LocalizationProvider>
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
                        onClick={onLoadFilters}
                        disabled={status == 'searching'}
                        >
                        Filter
                        </Button>
                    </Grid>
                </Grid>
          </form>
        </Grid>
        <Grid
          container
          sx={{
              display: 'flex',
              justifyContent: {xs:'center', md: status == 'searching' ? 'center' : 'space-between'},
              maxWidth: 1400,
              boxShadow: 2,
              borderRadius: '10px',
              margin: 3,
              padding: 2
          }}
        >
            {
              status == 'searching'? (
                <Checking/>
              )
              :(
                
                filteredEntries.length > 0 ?(
                  <>
                    {
                      filteredEntries.map((entry) => (
                        entry.public == true ?
                        <Entry entry = {entry} key={entry.id}/>
                        :
                        <></>
                        ))    
                    }
                    <Grid 
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: 3
                        }}
                    >
                        <Grid 
                            item 
                            sx={{ width: '50%', display:'flex', justifyContent:'end' }}
                            
                        >
                            <Button
                                sx={{
                                    backgroundColor:'#E7E3E3',
                                    padding: 1,
                                    color: 'black',
                                    textDecoration: 'none',
                                    marginX: 1,
                                    borderRadius: '10px',
                                    '&:hover':{
                                        opacity: 0.8
                                    }
                                }}
                                disabled={previous == null }
                                onClick={onPressPrevious}
                            >
                                Previous
                            </Button>
                        </Grid>
                        <Grid 
                            item 
                            sx={{ width: '50%', display:'flex', justifyContent:'start' }}
                            display={next == null ? 'none' : ''}
                        >
                            <Button
                                sx={{
                                    backgroundColor:'#E7E3E3',
                                    padding: 1,
                                    color: 'black',
                                    textDecoration: 'none',
                                    borderRadius: '10px',
                                    marginX: 1,
                                    '&:hover':{
                                        opacity: 0.8
                                    }
                                }}
                                disabled={next == null }
                                onClick={onPressNext}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                  </>     
                )       
                :(
                    <Alert 
                      severity="info"
                      sx={{
                        marginX: 'auto',
                      }}
                    >
                      No Matches Found
                    </Alert>
                )
              )
            }
        </Grid>
      </Grid>
    </BlogLayout>
  )
}



