import { React, useState, useEffect, useRef } from 'react'
import NavBar from './NavBar';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Users from './Users';
import Groups from './Groups';
import Messages from './Messages';
import styles from './MainPage.module.css'


function MainPage({ user }) {

  const [currentGroup, setCurrentGroup] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [message, setMessage] = useState()

  return (
    <>
      <div className={styles.mainPageContainer}>
        <div className={styles.sidebarContainer}>
          <Users selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
          <Groups user={user} setSelectedUsers={setSelectedUsers} message={message}  selectedUsers={selectedUsers} setCurrentGroup={setCurrentGroup} currentGroup={currentGroup}/>
        </div>
          {currentGroup && <Messages setMessage={setMessage} currentGroup={currentGroup} user={user} />}
      </div>
    </>
  )
}

export default MainPage
