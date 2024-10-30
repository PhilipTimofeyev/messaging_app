import { React, useEffect } from 'react'
import { addMessageToGroupAPI, createGroupAPI } from "../helpers/apiCalls.js";

function Groups({ groups, message, setSelectedGroup, selectedUsers, setCurrentGroup, currentGroup, setSelectedUsers }) {

  function clickGroup(groupId) {
    const group = groups.find(group => group.id === groupId)
    setSelectedGroup(group)
  }

  useEffect(() => {
    if (message) {
    const callGroup = async () => {
      let response
      // Check if new group vs used group
      if (currentGroup.messages.length == 0) {
        response = await createGroup()
      } else {
        response = await updateGroup()
      }
      setSelectedGroup(response.data.group)
      setSelectedUsers([])
    }
      callGroup()}
  }, [message])

  async function createGroup() {
    const userIds = selectedUsers.map(user => user.id)
    const response = await createGroupAPI('testgroup', message.id, userIds)
    return response
  }

  async function updateGroup() {
    const response = await addMessageToGroupAPI(message.id, currentGroup.group.id)
    return response
  }


  function createEmptyGroup() {
    const newGroup = {group: {}, users: selectedUsers, messages: []}
    setCurrentGroup(newGroup)
  }
    
  const listGroups = groups.map(group =>
      <li key={group.id}>
      <p onClick={() => clickGroup(group.id)}> {group.title}</p>
      </li>
  )
    
  return (
    <div>
      <h1>Groups</h1>
      <button onClick={createEmptyGroup}>New Group +</button>
      <div>
            <ul>{groups && listGroups}</ul>
      </div>
    </div>
  )
}

export default Groups
