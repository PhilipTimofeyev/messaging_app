import { React, useState, useEffect } from 'react'
import styles from './Users.module.css'

function SearchUsers({users, selectedUsers, setSelectedUsers}) {

  const [userList, setUserList] = useState([])

  function handleInputFocus() {
    const result = users.filter(user => !userInList(user))
    setUserList(result)
  }

  function handleClick(userId) {
    const selectedUser = users.find((user) => user.id === userId)
    setSelectedUsers([...selectedUsers, selectedUser])
    setUserList([])
  }

  function findUsers(value) {
    const result = users.filter(user => user.email.includes(value) && !userInList(user))
    setUserList(result)
  }

  const listUsers = userList.map(user => 
    <li key={user.id}>
      <p onClick={() => handleClick(user.id)}>{user.email}</p>
    </li>
  )

  function userInList(checkUser) {
    return selectedUsers.find(user => user.id === checkUser.id)
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <div>
        <input onFocus={handleInputFocus} onChange={e => findUsers(e.target.value)} defaultValue="Search users..."/>
            <ul>{userList && listUsers}</ul>
            </div>
      </div>
    </div>
  )
}

export default SearchUsers