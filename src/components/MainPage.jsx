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
  const [allGroups, setAllGroups] = useState()

  useEffect(() => {
    getGroups()
  }, [currentGroup])

  useEffect(() => {
    if (groups) getAllGroups()
  }, [groups])

  const getGroups = async () => {
    const response = await getGroupsAPI();
    setGroups(response.data)
  }

  function createEmptyGroup() {
    const newGroup = { group: {}, users: selectedUsers, messages: [] }
    setCurrentGroup(newGroup)
  }

  const getAllGroups = async () => {
    const promises = groups.map(async (group) => {
      const groupData = await getGroup(group.id)
      return await groupData.data
    })
    const groupsInfo = await Promise.all(promises)
    setAllGroups(groupsInfo)
  }

  useEffect(() => {
    function showGroupsWithSelectedUsers() {
      const matchedGroups = allGroups.filter((group) => {
        const userListIds = selectedUsers.map(user => user.id)
        userListIds.push(user.id)
        const groupIds = group.users.map(user => user.id)
        return groupIds.every(id => userListIds.includes(id))
      })
      setUserList([])
      if (matchedGroups.length == 0) {
        createEmptyGroup()
        return
      }
      setCurrentGroup(matchedGroups[0])
    }

    if (selectedUsers.length > 0) showGroupsWithSelectedUsers()
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
            {allGroups && <Groups user={user} setSelectedUsers={setSelectedUsers} message={message} allGroups={allGroups} selectedUsers={selectedUsers} setCurrentGroup={setCurrentGroup} currentGroup={currentGroup}/>}
          </div>
        </div>
        {currentGroup && <Messages setMessage={setMessage} currentGroup={currentGroup} user={user} />}
      </div>
    </>
  )
}

export default MainPage
