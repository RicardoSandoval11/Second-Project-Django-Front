import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        verifyMsg : null,
        verifyErrorMsg: null,
        registerMsg: null,
        registerErrorMsg: null,
        veryfyAccount: null,
        loginMsg: null,
        resestPasswordRequestSuccessMsg: null,
        resestPasswordRequestFailedMsg: null,
        changePasswordCodeStatus: null,
        changePasswordSuccessMsg: null,
        changePasswordFailedMsg: null
    },
    reducers: {
        onLogin: ( state ) => {
           state.status = 'authenticated';
        },
        onLoginFailed: (state, {payload = []}) => {
            state.loginMsg = payload;
            state.status = 'not-authenticated';;
        },
        onLogout: ( state ) => {
            state.user = null;
            state.status = 'not-authenticated';
        },
        onchecking: (state) => {
            state.status = 'checking';
        },
        onAccountVerified: (state, { payload = [] }) =>{
            state.verifyMsg = payload.msg;
            state.veryfyAccount = payload.ok,
            state.status = 'not-authenticated';
        },
        onAccountVerifiedFailed: (state, payload)=>{
            state.verifyErrorMsg = payload;
            state.status = 'not-authenticated';
        },
        onRegister(state, payload){
            state.registerMsg = payload;
            state.status = 'not-authenticated';
        },
        onRegisterFailed(state, payload){
            state.registerErrorMsg = payload;
            state.status = 'not-authenticated';
        },
        onChangePasswordRequestSuccess:(state, { payload }) => {
            state.resestPasswordRequestSuccessMsg = payload;
            state.status = 'not-authenticated';
        },
        onChangePasswordRequestFailed: ( state, { payload } ) => {
            state.resestPasswordRequestFailedMsg = payload;
            state.status = 'not-authenticated';
        },
        onClearMessages: (state) => {
            state.resestPasswordRequestFailedMsg = null;
            state.resestPasswordRequestSuccessMsg = null;
            state.changePasswordSuccessMsg = null;
            state.changePasswordFailedMsg = null;
            state.status = 'not-authenticated';
        },
        onVerifyChangePasswordCode: ( state, { payload } ) => {
            state.changePasswordCodeStatus = payload;
            state.status = 'not-authenticated';
        },
        onChangePassword: ( state, { payload } ) => {
            state.changePasswordSuccessMsg = payload;
            state.status = 'not-authenticated';
        },
        onChangePasswordFailed: ( state, { payload } ) => {
            state.changePasswordFailedMsg = payload;
            state.status = 'not-authenticated';
        }
    }
});

export const {
    onLogin,
    onLoginFailed,
    onLogout,
    onchecking,
    onAccountVerified,
    onAccountVerifiedFailed,
    onNotAuthenticated,
    onRegister,
    onRegisterFailed,
    onChangePasswordRequestSuccess,
    onChangePasswordRequestFailed,
    onClearMessages,
    onVerifyChangePasswordCode,
    onChangePassword,
    onChangePasswordFailed
} = authSlice.actions;