import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { blogApi } from "../api/blogApi";
import { 
        onchecking, 
        onLogin,
        onAccountVerified, 
        onAccountVerifiedFailed,
        onRegister,
        onRegisterFailed,
        onLoginFailed, 
        onLogout,
        onChangePasswordRequestSuccess,
        onChangePasswordRequestFailed,
        onClearMessages,
        onVerifyChangePasswordCode,
        onChangePassword,
        onChangePasswordFailed} from "../store/authentication/authSlice";


export const useAuthStore = () => {

    const { status, user } = useSelector( state => state.auth );

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const startLoginUser = async(email, password) => {

        dispatch(onchecking());

        try {
            const { data } = await blogApi.post('/auth/login',JSON.stringify({
                'email':email,
                'password':password
            }),{
                headers: {
                    'Content-Type': 'application/json'
                }
            } );

            localStorage.setItem('token',data.access);
            localStorage.setItem('refresh_token',data.refresh);

            // reading user data
            const decodedToken = jwtDecode(data.access);
            const { user_id } = decodedToken;
            localStorage.setItem('userId',user_id);

            dispatch(onLogin());
            
            navigate('/');
            
        } catch (error) {
            console.log(error);
            dispatch(onLoginFailed(error.response.data.detail));
        }
    }

    const startRegisterUser = async(name, email, password) => {

        dispatch(onchecking());

        try {
            const { data } = await blogApi.post('/auth/register',JSON.stringify({
                'full_name':name,
                'email':email,
                'password':password
            }),{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (data.ok == 'true') {
                dispatch(onRegister(data.msg));
                navigate(`/auth/account-confirmation/${data.userId}`);
            }

        } catch (error) {
            const { response } = error;
            dispatch(onRegisterFailed(response.data.msg));
        }
    }

    const startVerifyingUserAccount = async(idUser, Code) => {

        dispatch(onchecking());

        try {
            const { data } = await blogApi.post('/auth/account-verification',JSON.stringify({
                'user_id':idUser,
                'code': Code
            }),{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(onAccountVerified(data));

            if (data.ok == 'true') {
                navigate('/auth/login');
            }


        } catch (error) {
            
            const { response } = error;
            dispatch(onAccountVerifiedFailed(response.data.msg));
        }
    }

    
    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }
    
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');

        if(token == undefined || token == null){
            return startLogout();
        }

        try {
            const decodedToken = jwtDecode(token);
            const { exp } = decodedToken;

            const currentDate = Math.floor(new Date().getTime() / 1000)

            if(currentDate > exp){
                localStorage.clear();
                return startLogout();
            }

            const { data } = await blogApi.post('/auth/refresh-token',JSON.stringify({
                'refresh': localStorage.getItem('refresh_token')
            }),{
                headers: {
                    'Content-Type':'application/json'
                }
            });

            // Saving new token
            localStorage.setItem('token', data.access);

            // login process
            dispatch(onLogin());
            
        } catch (error) {
            localStorage.clear();
            startLogout();
        }
    }

    const startChecking = () => {
        dispatch(onchecking());
    }

    const startRequestUpdateEmail = async(email) => {

        let body = JSON.stringify({'email': email});

        try {
            
            const { data } = await blogApi.post('/auth/update-password-request',body,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(onChangePasswordRequestSuccess(data.msg));

        } catch (error) {
            dispatch(onChangePasswordRequestFailed(error.response.data.msg));
        }
    }

    const startVerifyingCode = async(code) => {

        let body = JSON.stringify({'code': code});

        try {
            
            const { data } = await blogApi.post('/auth/verify-code', body,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(onVerifyChangePasswordCode(data.ok));

        } catch (error) {
            
            dispatch(onVerifyChangePasswordCode(error.response.data.ok));
        }
    }

    const startChangingPassword = async(code, newPassword) => {

        try {

            let body = JSON.stringify({
                'code':code,
                'newPassword':newPassword
            });
    
            const { data } = await blogApi.post('/auth/update-password', body,{
                headers:{
                    'Content-Type': 'application/json'
                }
            });
    
            dispatch(onChangePassword(data.msg));
            
        } catch (error) {
            
            dispatch(onChangePasswordFailed(error.response.data.msg));

        }

        navigate('/auth/login');

    }

    const startClearingMessages = () => {
        dispatch(onClearMessages());
    }

  return {

    // Methods
    startLoginUser,
    startRegisterUser,
    startVerifyingUserAccount,
    startLogout,
    checkAuthToken,
    startChecking,
    startRequestUpdateEmail,
    startVerifyingCode,
    startChangingPassword,
    startClearingMessages
  }
}


