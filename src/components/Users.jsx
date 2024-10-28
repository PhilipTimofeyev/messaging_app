import { React, useState } from 'react'

function Users({ users }) {

  const [selectedUsers, setSelectedUsers] = useState([])
  const [userList, setUserList] = useState([])
  const [inputValue, setInputValue] = useState(null)

  function handleClick(userId) {
    const selectedUser = users.find((user) => user.id === userId)
    setSelectedUsers([...selectedUsers, selectedUser])
  }

  const listSelectedUsers = selectedUsers.map(user =>
    <li key={user.id}>
      <p>{user.email}</p>
    </li>
  )

  function findUsers(value) {

    if (value === '') return setUserList([])

    const result = users.filter((user) => user.email.includes(value))
    setUserList(result)
  }

  const listUsers = userList.map(user => 
    <li key={user.id}>
      <p onClick={() => handleClick(user.id)}>{user.email}</p>
    </li>
  )

  return (
    <div>
      <label>
        Text input: 
        <input 
        name="myInput"
          onChange={e => findUsers(e.target.value)}
        />
      </label>
      <ul>{userList && listUsers}</ul>
      <ul>{listSelectedUsers}</ul>
    </div>
  )
}

export default Users
