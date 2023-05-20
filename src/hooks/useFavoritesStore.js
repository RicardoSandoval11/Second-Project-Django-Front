import { useDispatch } from "react-redux";

import { blogApi } from "../api/blogApi";
import { onLoadMyFavorites } from "../store/favorites/favoriteSlice";


export const useFavoritesStore = () => {

    const dispatch = useDispatch();

    const startLoadingMyFavorites = async(previous, next) => {

        if(previous == null && next == null){
            try {
                const { data } = await blogApi.get('/api/favorites/my-favorites',{
                    headers: {
                        'Authorization': 'Bearer '+localStorage.getItem('token')
                    }
                });
    
                dispatch(onLoadMyFavorites(data));
    
            } catch (error) {
                console.log(error);
            }

        }else if(next != null){
            try {
                const { data } = await blogApi.get(next,{
                    headers: {
                        'Authorization': 'Bearer '+localStorage.getItem('token')
                    }
                });
    
                dispatch(onLoadMyFavorites(data));
    
            } catch (error) {
                console.log(error);
            }
        }else if(previous != null){
            try {
                const { data } = await blogApi.get(previous,{
                    headers: {
                        'Authorization': 'Bearer '+localStorage.getItem('token')
                    }
                });
    
                dispatch(onLoadMyFavorites(data));
    
            } catch (error) {
                console.log(error);
            }
        }


    }

    const startRemovingFavorite = async(favoriteId) => {
        try {
            const response = await blogApi.post('/api/favorites/remove',JSON.stringify({
                'favoriteId':favoriteId
            }),{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

        } catch (error) {
            console.log('error');
        }
    }

    return {
        // Methods
        startLoadingMyFavorites,
        startRemovingFavorite
    }
}