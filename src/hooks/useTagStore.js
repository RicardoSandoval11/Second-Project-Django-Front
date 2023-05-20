import { useDispatch } from "react-redux";
import { blogApi } from "../api/blogApi";
import { onLoadAllTags } from "../store/tags/tagsSlice";


export const useTagStore = () => {

    const dispatch = useDispatch();

    const startLoadingAllTags = async() => {

        try {

            const { data } = await blogApi.get('/api/tags');

            dispatch(onLoadAllTags(data));

        } catch (error) {
            console.log(error);
        }
    }

    return {
        // Methods
        startLoadingAllTags,
    }
}