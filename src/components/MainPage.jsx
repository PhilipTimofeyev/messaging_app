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
    if (selectedGroup) refreshGroup()
  }, [selectedGroup])

  async function refreshGroup() {
    const response = await getGroup(selectedGroup.id);
    setCurrentGroup(response.data)
  }

  useEffect(() => {
    const fetchData = async () => {
      const promises =  groups.map(async(group) => {
        const groupData = await getGroup(group.id)
        return await groupData.data
      })

      const groupUsers = await Promise.all(promises)
      // console.log(groupUsers)

      const matchedGroups = groupUsers.filter((group) => {
        const userListIds = selectedUsers.map(user => user.id)
        userListIds.push(user.id)
        console.log(userListIds)
        const groupIds = group.users.map(user => user.id)
        console.log('groupid', groupIds)
        // return group.users.every(user => userListIds.includes(user.id))
        return userListIds.every(id => groupIds.includes(id))
        // console.log(result)
      })
      //  console.log('userList', userListIds)
      //  console.log('groupUsers', groupUsers)
      console.log(matchedGroups)
      setUserList([])
      if (matchedGroups.length == 0) return
      setSelectedGroup(matchedGroups[0].group)
    }
    console.log(userList.length)
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
            {groups && <Groups setSelectedUsers={setSelectedUsers} message={message} groups={groups} setSelectedGroup={setSelectedGroup} selectedUsers={selectedUsers} setCurrentGroup={setCurrentGroup} currentGroup={currentGroup}/>}
          </div>
        </div>
        {currentGroup && <Messages setMessage={setMessage} currentGroup={currentGroup} user={user} />}
      </div>
    </>
  )
}

export default MainPage
