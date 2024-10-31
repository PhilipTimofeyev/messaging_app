import { React, useState, useEffect } from 'react'
import styles from './Users.module.css'
import { getUsersAPI } from "../helpers/apiCalls.js";

function Users({ selectedUsers, setSelectedUsers }) {

  const [users, setUsers] = useState()
  const [userList, setUserList] = useState([])

  function handleClick(userId) {
    const selectedUser = users.find((user) => user.id === userId)
    // Prevent adding same user multiple times
    if (selectedUsers.find(user => user.id === userId)) return 
    setSelectedUsers([...selectedUsers, selectedUser])
    setUserList([])
  }

  useEffect(() => {
    const callAPI = async () => {
      const response = await getUsersAPI();
      setUsers(response.data)
    }
    callAPI() 
  }, [])

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
    const result = users.filter(user => !userInList(user))
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
    <div className={styles.usersContainer}>
                <h1>Users</h1>
      <div className={styles.searchBar}>
      <label>
        Search Users: 
          <input onFocus={handleInputFocus} onChange={e => findUsers(e.target.value)}/>
      </label>
      </div>
      <div className={styles.userList}>
      <ul>{userList && listUsers}</ul>
      </div>
      <div className={styles.selectedUsers}>
      <h2>Send To:</h2>
      <ul>{listSelectedUsers}</ul>
      </div>
    </div>
  )
}

export default Users
