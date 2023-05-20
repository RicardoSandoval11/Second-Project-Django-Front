import { Routes, Route, Navigate } from "react-router-dom"
import { AllCategories } from "../pages/AllCategories"


export const CategoriesRoutes = () => {
  return (
    <Routes>
      {/* BASE URL: /categories/ */}
      <Route path='list-all' element={<AllCategories/>}/>

      {/* Default url */}
      <Route path="/*" element={<Navigate to='list-all'/>}/>
    </Routes>
  )
}


