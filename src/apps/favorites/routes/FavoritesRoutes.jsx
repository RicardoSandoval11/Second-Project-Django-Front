import { Routes, Route, Navigate } from "react-router-dom";

import { MyFavoritespage } from "../pages/MyFavoritespage";


export const FavoritesRoutes = () => {
  return (
    <Routes>

      {/* BASE URL: /favorites/ */}
      <Route path='my-favorites/' element={<MyFavoritespage/>}/>

      {/* DEFAULT URL */}
      <Route path='*' element={<Navigate to='my-favorites'/>}/>

    </Routes>
  )
}


