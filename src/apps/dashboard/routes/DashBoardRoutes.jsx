import { Routes, Route, Navigate } from 'react-router-dom';

import { Userdashboard } from '../pages/Userdashboard';

export const DashBoardRoutes = () => {
  return (
    <Routes>
      {/* BASE URL: /my-dashboard/ */}
      <Route path='' element={<Userdashboard/>}/>

      {/* DEFAULT URL */}
      <Route path='*' element={<Navigate to=''/>}/>

    </Routes>
  )
}


