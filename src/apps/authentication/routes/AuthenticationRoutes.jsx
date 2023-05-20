import { useSelector } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import { AccountConfirmation } from "../pages/AccountConfirmation"
import { ForgotPassword } from "../pages/ForgotPassword"
import { LoginPage } from "../pages/LoginPage"
import {RegisterPage} from "../pages/RegisterPage"
import { UpdatePasswordConfirm } from "../pages/UpdatePasswordConfirm"


export const AuthenticationRoutes = () => {

  return (
    <Routes>
      {/* BASE URL: /auth/ */}
  
      <Route path='login' element={<LoginPage/>}/>
      <Route path='register' element={<RegisterPage/>}/>
      <Route path='forgot-password' element={<ForgotPassword/>}/>
      <Route path='account-confirmation/:id' element={<AccountConfirmation/>}/>
      <Route path='update-password/:code' element={<UpdatePasswordConfirm/>}/>

      {/* DEFAULT URL */}
      <Route path='/*' element={<Navigate to='/login'/>}/>

    </Routes>
  )
}


