import { createSlice } from "@reduxjs/toolkit";

export const entrySlice = createSlice({
    name: 'entry',
    initialState: {
        status: 'searching',
        entries : [],
        activeEntry: null,
        detailEntry : [],
        filtered: false,
        filteredEntries: [],
        mostRecentEntries: [],
        mostPopularEntries: [], 
        entriesByIntersts: [],
        entriesByCategory: [],
        entryToUpdate: [],
        entryToFavoritesSuccessMsg: null,
        entryToFavoriteFailMsg: null,
        createEntrySucessMsg: null,
        createEntryFailedMsg: null,
        updateEntrySuccessMsg: null,
        updateEntryFailedMsg: null,
        myEntries: [],
        // Pagination
        next: null,
        previous: null
    },
    reducers: {
        onLoadEntries: ( state, { payload = [] } ) => {
           payload.forEach(entry => {
                const entryExists = state.entries.some( CurrentEnvet => CurrentEnvet.id == entry.id );
                if(!entryExists){
                    state.entries.push(entry);
                }
            
           });
           state.filtered = false;
           state.status = 'completed';
        },
        onLoadDetailsEntry: (state, { payload = [] }) => {
            state.detailEntry = payload;
            state.status = 'completed';
        },
        onLoadFilteredEntries: ( state, { payload = [] } ) => {
            state.filteredEntries = payload;
            state.next = payload.next;
            state.previous = payload.previous;
            state.status = 'completed';
        }, 
        onLoadMostRecentEntriesHome: (state, { payload = [] }) => {
            state.mostRecentEntries = payload;
            state.status = 'completed';
        },
        onLoadMostPopularEntries: (state, { payload = [] }) => {
            state.mostPopularEntries = payload.data;
            state.status = 'completed';
        },
        onLoadEntriesByIntersts: (state, payload) => {
            state.entriesByIntersts = payload;
            state.status = 'completed';
        },
        onLoadEntriesByCategory: (state, {payload}) => {
            state.entriesByCategory = payload.results;
            state.next = payload.next;
            state.previous = payload.previous;
            state.status = 'completed';
        },
        onSearching: (state) => {
            state.status = 'searching';
        },
        onLoadFilteredEntriesAdvanced: ( state, { payload } ) => {
            state.filteredEntries = payload.results;
            state.next = payload.next;
            state.previous = payload.previous;
            state.status = 'completed';
        }, 
        onAddEntryToFavorites: ( state, { payload } ) => {
            state.entryToFavoritesSuccessMsg = payload.msg,
            state.status = 'completed'
        },
        onAddEntryToFavoritesFail: ( state, { payload } ) => {
            state.entryToFavoriteFailMsg = payload.data.msg;
            state.status = 'completed';
        },
        onResetMessages: (state) => {
            state.entryToFavoriteFailMsg = null;
            state.entryToFavoritesSuccessMsg = null;
            state.createEntryFailedMsg = null;
            state.createEntrySucessMsg = null;
        },
        onLoadMyEntries: ( state, { payload } ) => {
            state.myEntries = payload.results;
            state.next = payload.next;
            state.previous = payload.previous;
            state.status = 'completed';
        },
        onLoadEntryToUpdate: ( state, {payload} ) => {
            state.entryToUpdate = payload.data;
            state.status = 'completed'
        },
        onCreateNewEntrySucess: ( state, {payload} ) => {
            state.createEntrySucessMsg = payload;
            state.status = 'completed';
        },
        onCreateNewEntryFailed: ( state, { payload } ) => {
            state.createEntryFailedMsg = payload;
            state.status = 'completed'
        },
        onUpdatingEntrySuccess: ( state, { payload } ) => {
            state.updateEntrySuccessMsg = payload;
            state.status = 'completed';
        },
        onUpdateEntryFailed: ( state, { paylaod } ) => {
            state.updateEntryFailedMsg = payload;
            state.status = 'completed';
        },
        onLoading: ( state ) => {
            state.status = 'searching';
        }
    }
});

export const {
    onLoadEntries,
    onLoadDetailsEntry,
    onLoadFilteredEntries,
    onLoadFilteredEntriesAdvanced,
    onSearching,
    onLoadMostRecentEntriesHome,
    onLoadMostPopularEntries,
    onLoadEntriesByIntersts,
    onLoadEntriesByCategory,
    onAddEntryToFavorites,
    onAddEntryToFavoritesFail,
    onResetMessages,
    onLoadMyEntries,
    onLoadEntryToUpdate,
    onCreateNewEntrySucess,
    onCreateNewEntryFailed,
    onUpdatingEntrySuccess,
    onUpdateEntryFailed,
    onLoading
} = entrySlice.actions;