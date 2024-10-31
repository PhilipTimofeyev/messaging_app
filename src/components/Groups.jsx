import { React, useState, useEffect, useRef } from 'react'
import { addMessageToGroupAPI, createGroupAPI, getGroup, getGroupsAPI } from "../helpers/apiCalls.js";

function Groups({ message, selectedUsers, setCurrentGroup, currentGroup, setSelectedUsers, user }) {

  const [groups, setGroups] = useState()
  const [allGroups, setAllGroups] = useState()
  const allGroupsRef = useRef()

  const getGroups = async () => {
    const response = await getGroupsAPI();
    setGroups(response.data)
  }

  useEffect(() => {
    getGroups()
  }, [currentGroup])

  useEffect(() => {
    if (groups) getAllGroups()
  }, [groups, selectedUsers])

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

  function createEmptyGroup() {
    const newGroup = { group: {}, users: selectedUsers, messages: [] }
    setCurrentGroup(newGroup)
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
      // console.log(selectedUsers.length)
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


  async function clickGroup(groupId) {
    const selectedGroup = allGroups.find(group => group.group.id === groupId)
    const response = await getGroup(selectedGroup.group.id);
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
        {allGroups.map((group) => (
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
    <div>
      <h1>Groups</h1>
      <div>
        {allGroups && <ListGroups/>}
      </div>
    </div>
  )
}

export default Groups
