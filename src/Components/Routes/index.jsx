import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Todo from '../Todo';
import SettingForm from '../sittengsForm';
import Login from '../Login';
import SignUp from '../Login/signup';



export default function Routers() {
  return (
    <div>
    <Routes>
   <Route path="/Settings"  element={<SettingForm/>}/>
   <Route path="/signup"  element={<SignUp/>}/>
   <Route path="/"  element={<Login/>}/>

  </Routes> 
       </div>
   
  )
}
