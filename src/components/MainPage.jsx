import { React, useState, useEffect } from 'react'
import NavBar from './NavBar';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Users from './Users';
import Groups from './Groups';
import Messages from './Messages';
import styles from './MainPage.module.css'
import { getGroupsAPI, getGroup } from "../helpers/apiCalls.js";


function MainPage({ user, users }) {

  const [groups, setGroups] = useState()
  const [selectedGroup, setSelectedGroup] = useState()
  const [currentGroup, setCurrentGroup] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])

  useEffect(() => {
    getGroups()
  }, [currentGroup])

  const getGroups = async () => {
    const response = await getGroupsAPI();
    setGroups(response.data)
  }

  useEffect(() => {
    
    if (selectedGroup) refreshGroup()
  }, [selectedGroup])

  async function refreshGroup() {
    console.log("REFRESH")
    console.log("SELECTED", selectedGroup)
    const response = await getGroup(selectedGroup.id);
    // setGroups(response.data)
    // console.log(response.data)
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
            {users && <Users users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>}
          </div>
          <div>
            {groups && <Groups groups={groups} setSelectedGroup={setSelectedGroup} selectedUsers={selectedUsers} setCurrentGroup={setCurrentGroup} currentGroup={currentGroup}/>}
          </div>
        </div>
        {currentGroup && <Messages currentGroup={currentGroup} user={user} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} setSelectedGroup={setSelectedGroup} />}
      </div>
    </>
  )
}

export default MainPage
