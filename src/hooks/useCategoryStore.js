import { useDispatch } from "react-redux";
import { blogApi } from "../api/blogApi"
import { onLoad20Categories, 
        onLoadAllCategories,
        onLoadCategories } from "../store/categories/categorySlice";


export const useCategoryStore = () => {

    const dispatch = useDispatch();

    const startLoadingHomeCategories = async() => {

      try {
        
        const response = await blogApi.get('/api/categories/home');
  
        const { data } = response;
  
        dispatch(onLoad20Categories(data));

      } catch (error) {

        console.log(error);
        
      }

    }

    const startLoadingAllCategories = async(kword, next, previous) => {

      if(next == null && previous == null){
        try {
  
          const { data } = await blogApi.get(`/api/categories?kword=${kword}`);
          
          dispatch(onLoadAllCategories(data));
  
        } catch (error) {
          console.log(error);
        }
      }else if(next != null && previous == null){

        try {
  
          const { data } = await blogApi.get(next);
          
          dispatch(onLoadAllCategories(data));
  
        } catch (error) {
          console.log(error);
        }

      }else if(next == null && previous != null){

        try {
  
          const { data } = await blogApi.get(previous);
          
          dispatch(onLoadAllCategories(data));
  
        } catch (error) {
          console.log(error);
        }

      }

    }

    const startLoadingCategories = async() => {
      try {

        const { data } = await blogApi.get('/api/all-categories');
        dispatch( onLoadCategories(data) );

      } catch (error) {
        console.log(error);
      }
    }


  return {

    // Methods
    startLoadingHomeCategories,
    startLoadingAllCategories,
    startLoadingCategories
  }
}


