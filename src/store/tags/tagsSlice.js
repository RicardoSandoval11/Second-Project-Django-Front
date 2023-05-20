import { createSlice } from "@reduxjs/toolkit";

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        status: 'searching',
        allTags : []
    },
    reducers: {
        onLoadAllTags: ( state, { payload } ) => {
           state.allTags = payload;
           state.status = 'completed';
        },
    }
});

export const {
    onLoadAllTags
} = tagsSlice.actions;