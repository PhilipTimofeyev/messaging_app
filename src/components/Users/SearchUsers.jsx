import { React, useState, useEffect, useRef } from 'react'
import styles from './Users.module.css'

function SearchUsers({users, selectedUsers, setSelectedUsers}) {

  const [userList, setUserList] = useState([])
  const [searchInput, setSearchInput] = useState("")

  function handleInputFocus() {
    const result = users.filter(user => !userInList(user))
    setUserList(result)
  }

  function handleClick(userId) {
    const selectedUser = users.find((user) => user.id === userId)
        console.log("COME ON")
    setSelectedUsers([...selectedUsers, selectedUser])
    setUserList([])
    setSearchInput('')
  }

  function findUsers(value) {
    const result = users.filter(user => user.email.includes(value) && !userInList(user))
    setUserList(result)
  }

  function handleOnChange(e) {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    findUsers(searchInput)
  }, [searchInput])

  function handleOnBlur() {
    setSearchInput('')
  }

  const listUsers = userList.map(user => 
    <li key={user.id}>
      <p onMouseDown={() => handleClick(user.id)}>{user.email}</p>
    </li>
  )

  function userInList(checkUser) {
    return selectedUsers.find(user => user.id === checkUser.id)
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <div>
          <input onChange={handleOnChange} onBlur={handleOnBlur} value={searchInput} defaultValue={'Search user'}/>
          {searchInput && <ul className={styles.listUsers}>{listUsers}</ul>}
        </div>
      </div>
    </div>
  )
}

export default SearchUsers