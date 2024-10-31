import { React, useState, useEffect, useRef } from 'react'
import { addMessageToGroupAPI, createGroupAPI, getGroupAPI, getGroupsAPI } from "../helpers/apiCalls.js";
import styles from './MainPage.module.css'

function Groups({ message, selectedUsers, setCurrentGroup, currentGroup, setSelectedUsers, user }) {

  const [groups, setGroups] = useState()
  const groupsRef = useRef()

  // Gets all groups' info for user
  useEffect(() => {
    async function getGroups() {
      let userGroups

      // get all groups for user
      const response = await getUserGroups();

      // get info for each group
      const promises = response.map(async (group) => {
        userGroups = await getGroupAPI(group.id)
        return await userGroups.data
      })
      userGroups = await Promise.all(promises)      
      const currentGroups = (selectedUsers.length === 0) ? userGroups : groupsRef.current
      setGroups(currentGroups)
    }
    getGroups()
  }, [currentGroup, selectedUsers])

  async function getUserGroups() {
    // get all groups for user
    const response = await getGroupsAPI();
    return response.data
  }

  function createEmptyGroup() {
    const newGroup = { group: {}, users: selectedUsers, messages: [] }
    setCurrentGroup(newGroup)
  }

  useEffect(() => {
    function showGroupsWithSelectedUsers() {

      let matchedGroups = []
      let exactGroup
      groups.forEach((group) => {
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
      groupsRef.current = matchedGroups

      if (exactGroup) {
        setCurrentGroup(exactGroup)
      } else {
        createEmptyGroup()
        return
      }
    }

      if (selectedUsers.length > 0) showGroupsWithSelectedUsers()
    }, [selectedUsers])


  async function clickGroup(groupId) {
    const selectedGroup = groups.find(group => group.group.id === groupId)
    const response = await getGroupAPI(selectedGroup.group.id);
    setCurrentGroup(response.data)
    setSelectedUsers([])
  }

  useEffect(() => {
    const callGroup = async () => {
      let response
      // Check if new group vs used group
      if (currentGroup.messages.length == 0) {
        response = await createGroup()
      } else {
        response = await updateGroup()
      }
      setCurrentGroup(response.data)
      setSelectedUsers([])
    }
    if (message) {callGroup()}
  }, [message])

  async function createGroup() {
    const userIds = selectedUsers.map(user => user.id)
    const response = await createGroupAPI('', message.id, userIds)
    return response
  }

  async function updateGroup() {
    const response = await addMessageToGroupAPI(message.id, currentGroup.group.id)
    return response
  }
    
  const ListGroups = () => {
    return (
      <ul>
        {groups.map((group) => (
          <li key={group.group.id} onClick={() => clickGroup(group.group.id)}>
            {/* <h4> {group.group.title && group.group.title}</h4> */}
            <ul>
              {group.users.map((groupUser) => {
                if (groupUser.id !== user.id)
                  return (
                < li key={groupUser.id } >
                  <h5>{groupUser.email}</h5>
                </li>
                  )
              })}
            </ul>
          </li>
        ))}
    </ul>
  )}
    
  return (
    <div className={styles.sidebarGroups}>
      <h1>Groups</h1>
      <div>
        {groups && <ListGroups/>}
      </div>
    </div>
  )
}

export default Groups
