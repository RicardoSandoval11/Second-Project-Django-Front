import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { blogApi } from "../api/blogApi";
import { 
        onLoadUserDetails, 
        onLoaduserEntries, 
        onLoadUserUpdateInformation,
        onUpdateInformationSuccess,
        onClearMessages } from "../store/user/userSlice";


export const useUserStore = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const startLoadinguserdetails = async() => {

        try {
            
            const { data } = await blogApi.get('/api/user/details',{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadUserDetails(data.userDetails));

        } catch (error) {
            console.log(error);
        }
    }

    const startloadingUserDetailsdashboard = async() => {
        try {
            
            const { data } = await blogApi.get('/api/entry/dashboard',{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoaduserEntries(data));

        } catch (error) {
            console.log(error);
        }
    }

    const startRetriveuserDetails = async(userId) => {
        try {

            const { data } = await blogApi.get(`/api/user/update/${userId}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadUserUpdateInformation(data));

        } catch (error) {
            console.log(error);
        }
    }

    const startUpdatingUserInformation = async(newData, userId) => {

        newData = JSON.stringify(newData);

        try {

            const { data, status } = await blogApi.put(`api/user/update-user/${userId}`,newData,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            if (status == 200) {
                dispatch(onUpdateInformationSuccess());
                navigate('/my-dashboard');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const startClearingMessages = () => {
        dispatch(onClearMessages());
    }

    return {
        // Methods
        startLoadinguserdetails,
        startloadingUserDetailsdashboard,
        startRetriveuserDetails,
        startUpdatingUserInformation,
        startClearingMessages
    }
}