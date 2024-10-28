import { React, useState } from 'react'
import styles from './Users.module.css'

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
    // setUserList(userList.filter(user => user.id !== userId));
    // Reset dropdown
    setUserList([])
  }

  function removeSelectedUser(userId) {
    setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
  }

  const listSelectedUsers = selectedUsers.map(user =>
    <li key={user.id}>
      {user.email}
      <span><button onClick={() => removeSelectedUser(user.id)}>X</button></span>
    </li>
  )

  function findUsers(value) {
    let result = users.filter((user) => {
      return user.email.includes(value)
    })

    result = result.filter(user => !userInList(user))
    setUserList(result)
  }

  function handleInputFocus() {
    setUserList(users)
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
    <div className={styles.usersContainer}>
      <label>
        Search Users: 
        <input onFocus={handleInputFocus}onChange={e => findUsers(e.target.value)}/>
      </label>
      <ul className={styles.userList}>{userList && listUsers}</ul>
      <div className={styles.selectedUsers}>
      <h2>Send To:</h2>
      <ul>{listSelectedUsers}</ul>
      </div>
    </div>
  )
}

export default Users
