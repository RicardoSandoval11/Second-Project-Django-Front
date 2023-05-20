import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: {
        status: 'searching',
        myFavorites: [],
        next: null,
        previous: null
    },
    reducers: {
        onLoadMyFavorites: ( state, { payload } ) => {
            state.myFavorites = payload.results;
            state.next = payload.next;
            state.previous = payload.previous;
            state.status = 'completed'
        }
    }
});

export const{
    onLoadMyFavorites,
} = favoriteSlice.actions;