import { React, useEffect } from 'react'
import { addMessageToGroupAPI, createGroupAPI, getGroup } from "../helpers/apiCalls.js";

function Groups({ allGroups, message, selectedUsers, setCurrentGroup, currentGroup, setSelectedUsers, user }) {

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
