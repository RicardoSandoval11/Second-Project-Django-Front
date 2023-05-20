import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        status: 'searching',
        allCategories : [],
        categories : [],
        categoriesHome: [],
        previous: null,
        next: null
    },
    reducers: {
        onLoadAllCategories: ( state, { payload } ) => {
           state.categories = payload.results;
           state.previous = payload.previous;
           state.next = payload.next;
           state.status = 'completed';
        },
        onLoad20Categories: (state, { payload = [] }) => {
            state.categoriesHome = payload;
            state.status = 'completed';
        },
        onLoadCategories: ( state, { payload } ) => {
            state.allCategories = payload;
            state.status = 'completed'
        }
    }
});

export const {
    onLoadAllCategories,
    onLoad20Categories,
    onLoadCategories
} = categorySlice.actions;