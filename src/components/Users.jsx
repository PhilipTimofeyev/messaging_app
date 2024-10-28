import React from 'react'

function Users({users}) {

  const listUsers = users.map(user => 
    <li key={user.id}>
      <p>{user.email}</p>
    </li>
  )

  return (
    <div>
      <ul>{listUsers}</ul>
    </div>
  )
}

export default Users
