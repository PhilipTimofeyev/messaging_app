import { React, useState, useEffect } from 'react'
import NavBar from './NavBar';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Users from './Users';
import Groups from './Groups';
import Messages from './Messages';
import styles from './MainPage.module.css'
import { getGroups, getGroup } from "../helpers/apiCalls.js";


function MainPage({ user, users }) {

  const [groups, setGroups] = useState()
  const [selectedGroup, setSelectedGroup] = useState()
  const [currentGroup, setCurrentGroup] = useState()

  useEffect(() => {
    const callAPI = async () => {
      const response = await getGroups();
      setGroups(response.data)
      console.log(response.data)
    }
    callAPI()
  }, [])

  useEffect(() => {
    
    if (selectedGroup) refreshGroup()
  }, [selectedGroup])

  async function refreshGroup() {
    console.log("REFRESH")
    const response = await getGroup(selectedGroup.id);
    // setGroups(response.data)
    console.log(response.data)
    setCurrentGroup(response.data)
  }

  return (
    <>
      <nav>
        <NavBar user={user}/>
      </nav>
      <div className={styles.mainPageContainer}>
        <div className={styles.sidebarContainer}>
          <div>
            <h1>Users</h1>
            {users && <Users users={users}/>}
          </div>
          <div>
            {groups && <Groups groups={groups} setSelectedGroup={setSelectedGroup} />}
          </div>
        </div>
        <div> <Messages currentGroup={currentGroup} refreshGroup={refreshGroup} user={user} /></div>
      </div>
    </>
  )
}

export default MainPage
