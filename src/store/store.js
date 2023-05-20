import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './authentication/authSlice';
import { categorySlice } from './categories/categorySlice';
import { entrySlice } from './entries/entrySlice';
import { favoriteSlice } from './favorites/favoriteSlice';
import { interestsSlice } from './interests/interestSlice';
import { tagsSlice } from './tags/tagsSlice';
import { userSlice } from './user/userSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        category: categorySlice.reducer,
        entry: entrySlice.reducer,
        favorites: favoriteSlice.reducer,
        interest: interestsSlice.reducer,
        tag: tagsSlice.reducer,
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});