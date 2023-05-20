import { createSlice } from "@reduxjs/toolkit";

export const interestsSlice = createSlice({
    name: 'interests',
    initialState: {
        status: 'searching',
        allInterests : []
    },
    reducers: {
        onLoadAllInterests: ( state, { payload } ) => {
           state.allInterests = payload;
           state.status = 'completed';
        },
    }
});

export const {
    onLoadAllInterests
} = interestsSlice.actions;