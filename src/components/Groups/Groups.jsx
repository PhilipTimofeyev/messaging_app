import { React, useState, useEffect, useRef } from 'react'
import { addMessageToGroupAPI, createGroupAPI, getGroupAPI, getGroupsAPI } from "../../helpers/apiCalls.js";
import Group from "./Group.jsx"
import styles from '../MainPage.module.css'

function Groups({ message, selectedUsers, setCurrentGroup, currentGroup, setSelectedUsers, user }) {

  const [groups, setGroups] = useState()
  const matchedGroupsRef = useRef()
  const userGroupsRef = useRef()

  // Gets user Groups
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
      console.log(userGroups)
      userGroupsRef.current = userGroups
      groupsToShow(userGroups)
    }
    getGroups()
  }, [currentGroup, selectedUsers])

  async function getUserGroups() {
    // get all groups for user
    const response = await getGroupsAPI();
    return response.data
  }

  function groupsToShow(userGroups) {
    // Shows either all groups of user, or groups with selected users
    const currentGroups = (selectedUsers.length === 0) ? userGroups : matchedGroupsRef.current
    setGroups(currentGroups)
  }

  // Updates groups with selected users
  useEffect(() => {
    function showGroupsWithSelectedUsers() {
      const {matchedGroups, exactGroup} = groupsWithSelectedUsers()
      matchedGroupsRef.current = matchedGroups

      exactGroup ? setCurrentGroup(exactGroup) : setEmptyGroup()
    }

      if (selectedUsers.length > 0) showGroupsWithSelectedUsers()
    }, [selectedUsers])

  function groupsWithSelectedUsers() {
    const userListIds = selectedUsersIds()

    let matchedGroups = []
    let exactGroup

    userGroupsRef.current.forEach((group) => {
      const groupIds = group.users.map(user => user.id)
      const isMatch =  userListIds.every(id => groupIds.includes(id))

      // length formula means exact group match
      if (isMatch && group.users.length === selectedUsers.length + 1) {
        matchedGroups.push(group);
        exactGroup = group
      } else if (isMatch) {
        matchedGroups.push(group);
      }
    })

    return {matchedGroups: matchedGroups, exactGroup: exactGroup}
  }

  function selectedUsersIds() {
    const userListIds = selectedUsers.map(user => user.id)
    // Make sure current user is in list
    userListIds.push(user.id)

    return userListIds
  }

  function setEmptyGroup() {
    const newGroup = { group: {}, users: selectedUsers, messages: [] }
    setCurrentGroup(newGroup)
  }

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
          <Group group={group} user={user}/>
          </li>
        ))}
    </ul>
  )}
    
  return (
    <div className={styles.sidebarGroups}>
      <h1>Groups</h1>
        {groups && <ListGroups/>}
    </div>
  )
}

export default Groups
