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
  const [currentGroup, setCurrentGroup] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [message, setMessage] = useState()
  const [userList, setUserList] = useState([])

  useEffect(() => {
    getGroups()
  }, [currentGroup])

  const getGroups = async () => {
    const response = await getGroupsAPI();
    setGroups(response.data)
  }

  useEffect(() => {
    const fetchData = async () => {
      const promises =  groups.map(async(group) => {
        const groupData = await getGroup(group.id)
        return await groupData.data
      })

      const groupUsers = await Promise.all(promises)

      const matchedGroups = groupUsers.filter((group) => {
        const userListIds = selectedUsers.map(user => user.id)
        userListIds.push(user.id)
        const groupIds = group.users.map(user => user.id)
        return userListIds.every(id => groupIds.includes(id))
      })
      setUserList([])
      if (matchedGroups.length == 0) return
      setCurrentGroup(matchedGroups[0])
    }
    if (selectedUsers.length > 0) fetchData()
}, [selectedUsers])

  return (
    <>
      <NavBar user={user}/>
      <div className={styles.mainPageContainer}>
        <div className={styles.sidebarContainer}>
          <div>
            <h1>Users</h1>
            {users && <Users users={users} userList={userList} setUserList={setUserList} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>}
          </div>
          <div>
            {groups && <Groups setSelectedUsers={setSelectedUsers} message={message} groups={groups} selectedUsers={selectedUsers} setCurrentGroup={setCurrentGroup} currentGroup={currentGroup}/>}
          </div>
        </div>
        {currentGroup && <Messages setMessage={setMessage} currentGroup={currentGroup} user={user} />}
      </div>
    </>
  )
}

export default MainPage
