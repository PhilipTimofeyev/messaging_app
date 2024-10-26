import React from 'react'
import { Link } from "react-router-dom";
import styles from './NavBar.module.css'

function NavBar() {
  return (
    <div className={styles.navBar}>
      <ul>
        <li>
            <Link to='/'>Main</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/signin'>Sign Out</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
