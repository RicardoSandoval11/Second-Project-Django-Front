import { useDispatch } from "react-redux";
import { blogApi } from "../api/blogApi";
import { onLoadAllInterests } from "../store/interests/interestSlice";

export const useInterestStore = () => {

    const dispatch= useDispatch();

    const startLoadingAllInterests = async() => {

        try {
            
            const { data } = await blogApi.get('/api/interest');

            dispatch(onLoadAllInterests(data));

        } catch (error) {
            console.log(error);
        }
    }

    return {

        // Methods
        startLoadingAllInterests

    }
}