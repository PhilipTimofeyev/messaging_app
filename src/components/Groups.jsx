import React from 'react'

function Groups({ groups, setSelectedGroup }) {

  function clickGroup(groupId) {
    const group = groups.find(group => group.id === groupId)
    console.log(groups)
    setSelectedGroup(group)
    
  }
    
    const listGroups = groups.map(group =>
        <li key={group.id}>
        <p onClick={() => clickGroup(group.id)}> {group.title}</p>
        </li>
    )
    
  return (
    <div>
      <h1>Groups</h1>
        <div>
              <ul>{groups && listGroups}</ul>
        </div>
    </div>
  )
}

export default Groups
