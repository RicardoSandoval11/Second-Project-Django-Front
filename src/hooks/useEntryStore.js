import { useSelector, useDispatch } from 'react-redux';
import { blogApi } from '../api/blogApi';
import { 
        onLoadDetailsEntry,
        onLoadFilteredEntries,
        onSearching,
        onLoadMostRecentEntriesHome,
        onLoadMostPopularEntries,
        onLoadEntriesByIntersts,
        onLoadEntriesByCategory,
        onLoadFilteredEntriesAdvanced,
        onAddEntryToFavorites,
        onAddEntryToFavoritesFail,
        onResetMessages,
        onLoadMyEntries,
        onLoadEntryToUpdate,
        onCreateNewEntrySucess,
        onCreateNewEntryFailed,
        onLoading, 
        onUpdatingEntrySuccess,
        onUpdateEntryFailed} from '../store/entries/entrySlice';


export const useEntryStore = () => {

    const dispatch= useDispatch();

    const startLoadingDetailsEntry = async(EntryId) => {

        try {
            dispatch(onSearching());
            const {data} = await blogApi.get(`/api/entry/details/${EntryId}`);

            // load entry
            dispatch(onLoadDetailsEntry(data));

        } catch (error) {
            
        }
    }

    const startLoadingEntriesByTag = async(tagId, previous, next) => {

        if(previous == null && next == null){
            try {
                dispatch(onSearching());
                const { data } = await blogApi.get(`/api/entry/filter/${tagId}`);
    
                // Loading filtered entries
                dispatch(onLoadFilteredEntries(data));
    
            } catch (error) {
                console.log(error);
            }
        }else if( previous != null ){
            try {
                dispatch(onSearching());
                const { data } = await blogApi.get(previous);
    
                console.log(data);
    
                // Loading filtered entries
                dispatch(onLoadFilteredEntries(data));
    
            } catch (error) {
                console.log(error);
            }
        }else if(next != null){
            try {
                dispatch(onSearching());
                const { data } = await blogApi.get(next);
    
                console.log(data);
    
                // Loading filtered entries
                dispatch(onLoadFilteredEntries(data));
    
            } catch (error) {
                console.log(error);
            }
        }
    }

    const startLoadingLastEntriesCreated = async() => {
        try {

            dispatch(onSearching());

            const { data } = await blogApi.get('api/most-recent-entries/home');
            
            // Load most recen entries in home page
            dispatch(onLoadMostRecentEntriesHome(data));


        } catch (error) {
            console.log(error);
        }
    }

    const StartLoadingMostPopularEntries = async() => {
        try {

            dispatch(onSearching());

            const {data} = await blogApi.get('/api/favorites/most-liked');

            dispatch(onLoadMostPopularEntries(data));


        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingEntriesByIntersts = async(token) => {
        try {

            dispatch(onSearching());

            const { data } = await blogApi.get('/api/entries-intersts/home',{
                headers: {
                    Authorization: 'Bearer '+token
                }
            });

            dispatch(onLoadEntriesByIntersts(data.data));

        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingEntriesByCategory = async(categoryId, previous, next) => {

        if(previous == null && next == null ){
            try {
    
                dispatch(onSearching());
    
                const { data } = await blogApi.get(`/api/entries-by-category/${categoryId}`);
    
                dispatch(onLoadEntriesByCategory(data));
    
            } catch (error) {
                console.log(error);
            }
        }else if(previous != null){
            try {
    
                dispatch(onSearching());
    
                const { data } = await blogApi.get(previous);
    
                dispatch(onLoadEntriesByCategory(data));
    
            } catch (error) {
                console.log(error);
            }
        }else if(next != null){
            try {
    
                dispatch(onSearching());
    
                const { data } = await blogApi.get(next);
    
                dispatch(onLoadEntriesByCategory(data));
    
            } catch (error) {
                console.log(error);
            }
        }
    }

    const startLoadingFilteredEntries = async(titlekword, contentkword, categoryid, interestid, tagid, startDate, endDate, next, previous) => {

        if(previous != null){
            try {
            
                const { data } = await blogApi.get(previous);
    
                dispatch(onLoadFilteredEntriesAdvanced(data));
    
            } catch (error) {
                console.log(error)
            }
        }else if(next != null){
            try {
            
                const { data } = await blogApi.get(next);
    
                dispatch(onLoadFilteredEntriesAdvanced(data));
    
            } catch (error) {
                console.log(error)
            }
        }else {

            if(startDate != null){
                const date = new Date(startDate);
                const year = date.getFullYear();
                const month = ('0' + (date.getMonth() + 1)).slice(-2);
                const day = ('0' + date.getDate()).slice(-2);
    
                startDate = `${year}-${month}-${day}`;
            }
    
            if(endDate != null){
                const date = new Date(endDate);
                const year = date.getFullYear();
                const month = ('0' + (date.getMonth() + 1)).slice(-2);
                const day = ('0' + date.getDate()).slice(-2);
    
                endDate = `${year}-${month}-${day}`;
            }
    
            let url = `/api/entries?kword1=${titlekword}&kword2=${contentkword}&categoryid=${categoryid}&interestid=${interestid}&tagid=${tagid}&startdate=${startDate}&enddate=${endDate}`;
    
            if(categoryid == ''){
                url = url.replace('&categoryid=','');
            }
            if(interestid == ''){
                url = url.replace('&interestid=','');
            }
            if(tagid == ''){
                url = url.replace('&tagid=','');
            }
            if(startDate == null){
                url = url.replace('&startdate=null','');
                url = url.replace('&enddate=null','');
            }
            if(endDate == null){
                url = url.replace('&startdate=null','');
                url = url.replace('&enddate=null','');
            }
            try {
                
                const { data } = await blogApi.get(url);
    
                dispatch(onLoadFilteredEntriesAdvanced(data));
    
            } catch (error) {
                console.log(error)
            }
        }


    }

    const startAddingEntryToFavorites = async(entryId) => {

            try {
                
                const { data } = await blogApi.post('/api/favorites/add',JSON.stringify({
                    entryId: entryId
                }) ,{
                    headers: {
                        'Authorization': 'Bearer '+localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });

                dispatch(onAddEntryToFavorites(data));

            } catch (error) {
                const { response } = error;
                dispatch(onAddEntryToFavoritesFail(response));
            }

    }

    const startResetMessages = () => {

        dispatch(onResetMessages());
    }

    const startLoadingMyEntries = async(previous, next) => {

        if(previous != null && next == null){

            const { data } = await blogApi.get(previous,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadMyEntries(data));
        }else if(next != null && previous == null){
            const { data } = await blogApi.get(next,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadMyEntries(data));
        }else {
            const { data } = await blogApi.get('/api/my-entries',{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadMyEntries(data));
        }

    }

    const startDeletingEntry = async(entryId) => {
        try {

            const response = await blogApi.post('/api/entry/delete',JSON.stringify({
                'entryId':entryId
            }) ,{
                headers: {
                    'Authorization':'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

        } catch (error) {

            console.log(error);

        }
    }

    const startLoadingEntryToUpdate = async(entryId) => {

        try {
            
            const { data } = await blogApi.get(`/api/entry/get-to-update?entryId=${entryId}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadEntryToUpdate(data));

        } catch (error) {
            console.log(error);
        }
    }

    const startUpdatingEntry = async(formData, entryId) => {
        try {
            
            const { data } = await blogApi.put(`api/entry/update-entry/${entryId}`,formData,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch(onUpdatingEntrySuccess(data.msg));

        } catch (error) {
            
            dispatch(onUpdateEntryFailed(error.response.data.msg));
        }
    }

    const startCreatingNewEntry = async(formData) => {
        try {
            
            const { data } = await blogApi.post('/api/entry/create',formData,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch(onCreateNewEntrySucess(data.msg));

        } catch (error) {


            dispatch(onCreateNewEntryFailed(error.response.data.msg));
            
        }
    }

    const startLoading = () => {
        dispatch(onLoading());
    }

    return{

        // Properties

        // Methods
        startLoadingFilteredEntries,
        startLoadingDetailsEntry,
        startLoadingEntriesByTag,
        startLoadingLastEntriesCreated,
        StartLoadingMostPopularEntries,
        startLoadingEntriesByIntersts,
        startLoadingEntriesByCategory,
        startAddingEntryToFavorites,
        startResetMessages,
        startLoadingMyEntries,
        startDeletingEntry,
        startLoadingEntryToUpdate,
        startLoading,
        startCreatingNewEntry,
        startUpdatingEntry 
    }
}