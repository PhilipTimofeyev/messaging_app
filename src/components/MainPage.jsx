import { React, useState, useEffect, useRef } from 'react'
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
  const [allGroups, setAllGroups] = useState()
  const allGroupsRef = useRef()

  useEffect(() => {
    getGroups()
  }, [currentGroup])

  useEffect(() => {
    if (groups) getAllGroups()
  }, [groups, selectedUsers])

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
      const groupsData = await getGroup(group.id)
      return await groupsData.data
    })
    const groupsInfo = await Promise.all(promises)
    
    if (selectedUsers.length === 0) {
      setAllGroups(groupsInfo)
    } else {
      setAllGroups(allGroupsRef.current)
    }
  }

  useEffect(() => {
    function showGroupsWithSelectedUsers() {

      let matchedGroups = []
      let exactGroup
      allGroups.forEach((group) => {
        const userListIds = selectedUsers.map(user => user.id)
        userListIds.push(user.id)
        const groupIds = group.users.map(user => user.id)
        const isMatch =  userListIds.every(id => groupIds.includes(id))
        if (isMatch && group.users.length === selectedUsers.length + 1) {
          matchedGroups.push(group);
          exactGroup = group
        } else if (isMatch) {
          matchedGroups.push(group);
        }
      })
      console.log(selectedUsers.length)
      allGroupsRef.current = matchedGroups

      if (exactGroup) {
        setCurrentGroup(exactGroup)
      } else {
        createEmptyGroup()
        return
      }
    }

    if (selectedUsers.length > 0) showGroupsWithSelectedUsers()
  }, [selectedUsers])

  return (
    <>
      <div className={styles.mainPageContainer}>
        <div className={styles.sidebarContainer}>
          <div>
            <h1>Users</h1>
            {<Users users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>}
          </div>
          <div className={styles.sidebarGroups}>
            {allGroups && <Groups user={user} setSelectedUsers={setSelectedUsers} message={message} allGroups={allGroups} selectedUsers={selectedUsers} setCurrentGroup={setCurrentGroup} currentGroup={currentGroup}/>}
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
