import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'checking',
        user: [],
        userEntries: [],
        userUpdate: [],
        successInformationUpdatedMsg: null
    },
    reducers: {
        onLoadUserDetails: (state, {payload}) => {
            state.user = payload;
            state.status = 'completed';
        },
        onLoaduserEntries: ( state, {payload} ) => {
            state.userEntries = payload;
            state.status = 'completed';
        },
        onLoadUserUpdateInformation: ( state, {payload} ) => {
            state.userUpdate = payload;
            state.status = 'completed';
        },
        onUpdateInformationSuccess: ( state ) => {
            state.successInformationUpdatedMsg = 'Information Updated Successfully';
        },
        onClearMessages: ( state ) => {
            state.successInformationUpdatedMsg = null;
        }
    }
});

export const  {
    onLoadUserDetails,
    onLoaduserEntries,
    onLoadUserUpdateInformation,
    onUpdateInformationSuccess,
    onClearMessages
} = userSlice.actions;