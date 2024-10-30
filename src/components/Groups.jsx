import { React, useEffect } from 'react'
import { addMessageToGroupAPI, createGroupAPI, getGroup } from "../helpers/apiCalls.js";

function Groups({ allGroups, message, selectedUsers, setCurrentGroup, currentGroup, setSelectedUsers }) {

  async function clickGroup(groupId) {
    const selectedGroup = allGroups.find(group => group.group.id === groupId)
    const response = await getGroup(selectedGroup.group.id);
    setCurrentGroup(response.data)
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
    const response = await createGroupAPI('testgroup', message.id, userIds)
    return response
  }

  async function updateGroup() {
    const response = await addMessageToGroupAPI(message.id, currentGroup.group.id)
    return response
  }
    
  const listGroups = allGroups.map(group =>
      <li key={group.group.id}>
        <p onClick={() => clickGroup(group.group.id)}> {group.group.title}</p>
      </li>
  )
    
  return (
    <div>
      <h1>Groups</h1>
      {/* <button onClick={createEmptyGroup}>New Group +</button> */}
      <div>
        <ul>{allGroups && listGroups}</ul>
      </div>
    </div>
  )
}

export default Groups
