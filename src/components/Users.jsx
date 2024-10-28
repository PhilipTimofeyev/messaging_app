import { React, useState } from 'react'

function Users({ users }) {

  const [selectedUsers, setSelectedUsers] = useState([])
  const [userList, setUserList] = useState([])
  const [inputValue, setInputValue] = useState(null)

  function handleClick(userId) {
    const selectedUser = users.find((user) => user.id === userId)
    // Prevent adding same user multiple times
    if (selectedUsers.find(user => user.id === userId)) return 
    setSelectedUsers([...selectedUsers, selectedUser])
    // Remove selected user from dropdown
    setUserList(userList.filter(user => user.id !== userId));
  }

  const listSelectedUsers = selectedUsers.map(user =>
    <li key={user.id}>
      <p>{user.email}</p>
    </li>
  )

  function findUsers(value) {
    console.log(value)
    if (value === '') return setUserList([])

    let result = users.filter((user) => {
      return user.email.includes(value)
    })

    result = result.filter(user => !userInList(user))
    setUserList(result)
  }

  function userInList(checkUser) {
    return selectedUsers.find(user => user.id === checkUser.id)
  }

  const listUsers = userList.map(user => 
    <li key={user.id}>
      <p onClick={() => handleClick(user.id)}>{user.email}</p>
    </li>
  )

  return (
    <div>
      <label>
        Search Users: 
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
