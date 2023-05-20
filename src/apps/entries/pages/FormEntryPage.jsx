import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogLayout } from '../../layouts/BlogLayout';
import { Grid, Typography, TextField, MenuItem, Button, Fab, Checkbox } from '@mui/material';
import { useCategoryStore } from '../../../hooks/useCategoryStore';
import { useInterestStore } from '../../../hooks/useInterestStore';
import { useTagStore } from '../../../hooks/useTagStore';
import { useSelector } from 'react-redux';
import { AddCircle } from '@mui/icons-material';
import Swal from 'sweetalert2';

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useEntryStore } from '../../../hooks/useEntryStore';


export const FormEntryPage = () => {

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


    const { startLoadingCategories } = useCategoryStore();
    const { startLoadingAllInterests } = useInterestStore();
    const { startLoadingAllTags } = useTagStore();
    const { startLoading, startCreatingNewEntry } = useEntryStore();

    useEffect(() => {
        startLoadingCategories();
        startLoadingAllInterests();
        startLoadingAllTags();
      },[]);

    // Get data
    const { allCategories } = useSelector( state => state.category );
    const { allInterests } = useSelector( state => state.interest );
    const { allTags } = useSelector( state => state.tag );
    const { status } = useSelector( state => state.entry );

    const [title, setTitle] = useState('');

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const [summary, setSummary] = useState('');

    const onSummaryChange = (event) => {
        setSummary(event.target.value);
    }

    const [data, setData] = useState('');

    const handleOnChange = (event, editor) => {
        const data = editor.getData();
        setData(data);
    }

    const [category, setCategory] = useState('');

    const onChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    const [interests, setInterests] = useState([]);

    const handleChangeInterests = (event) => {
        setInterests(event.target.value);
    };


    const [tags, setTags] = useState([]);

    const onTagChange = (event) => {
        setTags(event.target.value);
    }

    const [image, setImage] = useState('');

    const onImageFieldChange = (event) => {

        setImage(event.target.files[0]);

    }

    const [Public, setPublic] = React.useState(false);

    const handleChangePublic = (event) => {
        setPublic(event.target.checked);
    };

    const onSubmitForm = (event) => {
        event.preventDefault();
        if (title != '' && summary != '' && content != null && category != '' && interests.length != 0 && tags.length != 0 && image != '') {
            startLoading();
        }
    }

    const onCreateNewEntry = () => {
        if (title != '' && summary != '' && data != '' && category != '' && interests.length != 0 && tags.length != 0 && image != '') {

            let sentTags = [];

            for (let index = 0; index < tags.length; index++) {
                const element = tags[index];
                sentTags.push(parseInt(element.id));
                
            }

            let sentInterests = [];

            for (let index = 0; index < interests.length; index++) {
                const element = interests[index];
                sentInterests.push(parseInt(element.id));
            }

            const formData = new FormData();

            formData.append('user', localStorage.getItem('userId'));
            formData.append('title', title);
            formData.append('summary', summary);
            formData.append('content', data);
            formData.append('category', category);
            sentInterests.forEach((interestId) => formData.append('interests', interestId));
            sentTags.forEach((tagId) => formData.append('tags', tagId));
            formData.append('image', image);
            formData.append('public',Public);

            startCreatingNewEntry(formData);

            window.location.reload();

        }else{
            Swal.fire('Empty Fields', 'All Fields Are Requiered','warning');
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
                <form onSubmit={onSubmitForm}>
                    <Grid
                        container
                        sx={{
                            boxShadow: 3,
                            borderRadius: '10px',
                            padding: 2,
                            margin: 2
                        }}
                    >
                        <Grid
                            item
                            sx={{
                                marginY: 2,
                                width: '100%'
                            }}
                        >
                            <Typography 
                                variant='h4' 
                                sx={{
                                    fontWeight: 600, 
                                    fontStyle: 'italic'
                            }}>
                                Create a New Entry
                            </Typography>
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
                                label = 'Title'
                                type= 'text'
                                size="small"
                                placeholder='Entry Title'
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
                                label = 'Summary'
                                type= 'text'
                                size="small"
                                fullWidth
                                name='summary'
                                onChange={onSummaryChange}
                                value={summary}
                            />
                        </Grid>
                        <Grid
                            item
                            sx={{
                                padding: 2,
                                mb: 2,
                                width: '100%'
                            }}
                        >
                            <Typography sx={{display: 'block', marginY: 2, padding: 1}} variant='body1'>Content</Typography>
                            <CKEditor
                                editor={ ClassicEditor }
                                data=""
                                onChange={handleOnChange}
                            />
                        </Grid>
                        <Grid 
                            item 
                            sx={{ 
                                mt: 2,
                                width:{xs:'100%', sm: '30%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <TextField
                                id="outlined-select-currency"
                                select
                                fullWidth
                                label="Category"
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
                                width:{xs:'100%', sm: '30%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <FormControl sx={{ m: 1, width: '100%' }}>
                                <InputLabel id="demo-multiple-chip-label">Interests</InputLabel>
                                <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={interests}
                                onChange={handleChangeInterests}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
                                    <MenuItem
                                    key={interest.id}
                                    value={interest}
                                    >
                                    {interest.name}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid 
                            item 
                            sx={{ 
                                mt: 2,
                                width:{xs:'100%', sm: '30%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <FormControl sx={{ m: 1, width: '100%' }}>
                                <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
                                <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={tags}
                                onChange={onTagChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value.id} label={value.name} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {allTags.map((tag) => (
                                    <MenuItem
                                    key={tag.id}
                                    value={tag}
                                    >
                                    {tag.name}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid 
                            item 
                            sx={{ 
                                mt: 4,
                                display: 'flex',
                                justifyContent: 'center',
                                width:{xs:'100%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <label htmlFor="upload-photo">
                            <input
                                style={{ display: "none" }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                onChange={onImageFieldChange}
                            />
                            <Fab
                                color="secondary"
                                size="small"
                                component="span"
                                aria-label="add"
                                variant="extended"
                            >
                            <AddCircle /> Upload The Cover Photo of your entry
                            </Fab>
                            </label>
                        </Grid>
                        <Grid 
                            item 
                            sx={{ 
                                mt: 4,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width:{xs:'100%'},
                                marginX: {sm: 1}
                            }}
                        >
                            <Typography>
                                Do You Want Your Entry Public ?
                            </Typography>
                            <Checkbox
                                checked={Public}
                                onChange={handleChangePublic}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Grid>
                        <Grid
                            item
                            sx={{
                                marginY: 3,
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%'
                            }}
                        >
                            <Button
                                variant='contained'
                                disabled={status == 'searching'}
                                onClick={onCreateNewEntry}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </BlogLayout>
        

  )
}

