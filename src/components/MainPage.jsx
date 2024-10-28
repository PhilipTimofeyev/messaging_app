import { React, useState, useEffect } from 'react'
import NavBar from './NavBar';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";


function MainPage({ user }) {

  return (
    <>
      <nav>
        <NavBar user={user}/>
      </nav>
      <Outlet/>
    </>
  )
}

export default MainPage
