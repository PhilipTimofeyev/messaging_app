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
          <div>
            <h1>Users</h1>
            {<Users selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>}
          </div>
          <div className={styles.sidebarGroups}>
            {<Groups user={user} setSelectedUsers={setSelectedUsers} message={message}  selectedUsers={selectedUsers} setCurrentGroup={setCurrentGroup} currentGroup={currentGroup}/>}
          </div>
        </div>
        <div className={styles.messageWindow}>
          {currentGroup && <Messages setMessage={setMessage} currentGroup={currentGroup} user={user} />}
        </div>
      </div>
    </>
  )
}

export default MainPage
