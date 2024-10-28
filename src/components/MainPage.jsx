import { React, useState, useEffect } from 'react'
import NavBar from './NavBar';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Users from './Users';


function MainPage({ user }) {

  return (
    <>
      <nav>
        <NavBar user={user}/>
      </nav>
      <Outlet/>
      <h1>MESSAGE</h1>
      <div>
        <Users/>
      </div>
    </>
  )
}

export default MainPage
