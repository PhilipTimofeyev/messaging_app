import React from 'react'

function Groups({ groups, setSelectedGroup, selectedUsers, setCurrentGroup, currentGroup }) {

  function clickGroup(groupId) {
    const group = groups.find(group => group.id === groupId)
    setSelectedGroup(group)
    
  }

  function createGroup() {
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
      <button onClick={createGroup}>New Group +</button>
      <div>
            <ul>{groups && listGroups}</ul>
      </div>
    </div>
  )
}

export default Groups
