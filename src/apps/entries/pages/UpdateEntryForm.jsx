import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogLayout } from '../../layouts/BlogLayout';
import { Grid, Typography, TextField, MenuItem, Button, Fab, Checkbox, Link } from '@mui/material';
import { useCategoryStore } from '../../../hooks/useCategoryStore';
import { useSelector } from 'react-redux';
import { AddCircle } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useEntryStore } from '../../../hooks/useEntryStore';
import { Checking } from '../../../ui/Checking';
import Swal from 'sweetalert2';


export const UpdateEntryForm = () => {

    const { id } = useParams();

    const { startLoadingCategories } = useCategoryStore();
    const { startLoadingEntryToUpdate, startLoading, startUpdatingEntry } = useEntryStore();

    useEffect(() => {
        startLoadingEntryToUpdate(id);
        startLoadingCategories();
      },[]);

    // Get data
    const { allCategories } = useSelector( state => state.category );
    const { entryToUpdate, status } = useSelector( state => state.entry );

    const [title, setTitle] = useState(entryToUpdate.title);

    useEffect(() => {
        if(entryToUpdate.title != undefined){
            if(entryToUpdate.title != title){
                setTitle(entryToUpdate.title);
            }
        }

    },[entryToUpdate.title]);

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const [summary, setSummary] = useState(entryToUpdate.summary);

    useEffect(() => {
        if(entryToUpdate.summary != undefined){
            if(entryToUpdate.summary != summary){
                setSummary(entryToUpdate.summary);
            }
        }

    },[entryToUpdate.summary]);

    const onSummaryChange = (event) => {
        setSummary(event.target.value);
    }

    const [category, setCategory] = useState('');

    useEffect(() => {
        if(entryToUpdate.category != undefined ){
            if(entryToUpdate.category.id != category){
                setCategory(entryToUpdate.category.id);
            }
        }

    },[entryToUpdate]);

    const onChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    const [data, setData] = useState(entryToUpdate.content);

    const handleOnChange = (event, editor) => {
        const data = editor.getData();
        setData(data);

    }

    const [image, setImage] = useState(null);

    const onImageFieldChange = (event) => {

        setImage(event.target.files[0]);

    }

    const [Public, setPublic] = React.useState(false);

    useEffect(() => {
        if(entryToUpdate.public != undefined){
            setPublic(entryToUpdate.public);
        }

    },[entryToUpdate.public]);

    const handleChange = (event) => {
        setPublic(event.target.checked);
    };

    // Form submit
    const onUpdateEntry = () => {
        if(title != '' && summary != '' && category != null){
            const formData = new FormData();
            formData.append('category',category);
            formData.append('title',title);
            formData.append('summary',summary);
            if(data == undefined){
                formData.append('content', entryToUpdate.content);
            }else{
                formData.append('content', data);
            }
            formData.append('public', Public);
            if (image != null) {
                formData.append('image', image);
            }
            startUpdatingEntry(formData, entryToUpdate.id);
            window.location.reload();
        }else{
            Swal.fire('Empty Fields', 'Fields cannot be empty', 'warning');
        }
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        if(title != '' && summary != '' && data != '' && category != null){
            startLoading();
        }
    }

  return (
        <BlogLayout>
            {
                entryToUpdate.title == undefined || entryToUpdate.summary == undefined || entryToUpdate.category == undefined || entryToUpdate.content == undefined?
                    <Checking/>
                :
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
                                        width:{xs:'100%', sm: '47%',md:'30%'},
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
                                        data={entryToUpdate.content}
                                        onChange={handleOnChange}
                                    />
                                </Grid>
                                <Grid 
                                    item 
                                    sx={{ 
                                        mt: 2,
                                        width:{xs:'100%', sm: '47%',md:'30%'},
                                        marginX:'auto'
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
                                        mt: 4,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexWrap: 'wrap',
                                        width:{xs:'100%',md:'30%'},
                                        marginX: {sm: 1}
                                    }}
                                >
                                    <Link 
                                        href={entryToUpdate.image}
                                        target='_blank'
                                        sx={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'center',
                                            mb: 2
                                        }}
                                    >
                                        Current Image
                                    </Link>
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
                                            <AddCircle /> Update The Cover Photo of your entry
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
                                        width:{xs:'100%',md:'30%'},
                                        marginX: {sm: 1}
                                    }}
                                >
                                    <Typography>
                                        Do You Want Your Entry Public ?
                                    </Typography>
                                    <Checkbox
                                        checked={Public}
                                        onChange={handleChange}
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
                                        disabled={status == 'checking'}
                                        onClick={onUpdateEntry}
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
            }
        </BlogLayout>
  )
}

