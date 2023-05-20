import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { AuthenticationRoutes } from '../apps/authentication/routes/AuthenticationRoutes';
import { CategoriesRoutes } from '../apps/categories/routes/CategoriesRoutes';
import { UpdateInformation } from '../apps/dashboard/pages/UpdateInformation';
import { DashBoardRoutes } from '../apps/dashboard/routes/DashBoardRoutes';
import { EntryRoutes } from '../apps/entries/routes/EntryRoutes';
import { FavoritesRoutes } from '../apps/favorites/routes/FavoritesRoutes';
import { HomeRoutes } from '../apps/home/routes/HomeRoutes';
import { useAuthStore } from '../hooks/useAuthStore';

export const AppRoutes = () => {

  const { checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  },[]);

  const { status } = useSelector( state => state.auth );
  
  return (
    <Routes>
      <Route path='/*' element={<HomeRoutes/>}/>
      <Route path='/entries/*' element={<EntryRoutes/>}/>
      <Route path='/categories/*' element={<CategoriesRoutes/>}/>
      {
        status == 'authenticated' ?
        <>
          <Route path='/favorites/*' element={<FavoritesRoutes/>}/>
          <Route path='/my-dashboard/*' element={<DashBoardRoutes/>}/>
          <Route path='/update-account/:id' element={<UpdateInformation/>}/>
        </>
        :
        <Route path='/auth/*' element={<AuthenticationRoutes/>}/>
      }
    </Routes>
  )
}


