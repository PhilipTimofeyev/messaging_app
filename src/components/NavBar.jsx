import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from './NavBar.module.css'
import axios from "axios";

function NavBar({ user }) {
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('accessToken')

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000/",
    headers: {
      "Content-type": "application/json",
      'Authorization': 'Bearer ' + accessToken
    }
  });

  function handleSignOut() {
    axiosInstance.post('/users/tokens/revoke')
    localStorage.removeItem("token")
    navigate('/signin')
  }

  return (
    <div className={styles.navBar}>
      <ul>
        <li>
          <Link to='/'>Main</Link>
          <Link to='/profile'>Profile</Link>
          <Link onClick={handleSignOut}>Sign Out</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
