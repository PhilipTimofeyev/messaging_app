import React from 'react'
import NavBar from './NavBar';
import { Link, Outlet } from "react-router-dom";


function MainPage() {

  return (
    <>
      <nav>
        <NavBar/>
      </nav>
      <Outlet/>
    </>
  )
}

export default MainPage
