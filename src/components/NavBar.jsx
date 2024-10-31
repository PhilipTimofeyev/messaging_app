import { React, useState, useEffect } from 'react'
import { Link, useNavigate, Outlet } from "react-router-dom";
import styles from './NavBar.module.css'
import { revokeToken } from "../helpers/apiCalls.js";

function NavBar({ user }) {
  const navigate = useNavigate()

  function handleSignOut() {
    revokeToken()
    localStorage.removeItem("token")
    navigate('/signin')
  }

  return (
    <>
    <div className={styles.navBar}>
      <ul>
        <li>
          <Link to='/'>Main</Link>
          <Link to='/profile'>Profile</Link>
          <Link onClick={handleSignOut}>Sign Out</Link>
        </li>
      </ul>
    </div>
    <Outlet/>
    </>
  )
}

export default NavBar
