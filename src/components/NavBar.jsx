import { React, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import styles from './NavBar.module.css'
import { useApi } from '../hooks/useApi.js'
import { Navigate } from 'react-router-dom';

function NavBar({ user }) {
    const url = 'http://127.0.0.1:3000/users/tokens/revoke'
    const [requestOptions, setRequestOptions] = useState()
    
    const { data, isLoading, error } = useApi(url, requestOptions)

    async function handleSignOut() {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + user.token },
        };
        setRequestOptions(requestOptions)
    }

  return (
    <div className={styles.navBar}>
      <ul>
        <li>
          <Link to='/'>Main</Link>
          <Link to='/profile'>Profile</Link>
          <Link onClick={handleSignOut}>Sign Out</Link>
          {requestOptions && (<Navigate to="/signin" replace={true} />)}
        </li>
      </ul>
    </div>
  )
}

export default NavBar
