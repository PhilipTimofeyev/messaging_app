import React from 'react'
import NavBar from './NavBar';
import { Link, Outlet } from "react-router-dom";


function MainPage({ user, setUserAuth }) {

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
