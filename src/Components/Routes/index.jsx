import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Todo from '../Todo';
import SettingForm from '../sittengsForm';
import Login from '../Login';



export default function Routers() {
  return (
    <div>
    <Routes>
   <Route path="/Settings"  element={<SettingForm/>}/>
   <Route path="/login"  element={<Login/>}/>
   <Route path="/"  element={<Todo/>}/>

  </Routes> 
       </div>
   
  )
}
