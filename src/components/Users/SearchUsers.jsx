import { React, useState, useEffect, useRef } from 'react'
import styles from './Users.module.css'

function SearchUsers({users, selectedUsers, setSelectedUsers}) {

  const [userList, setUserList] = useState([])
  const [searchInput, setSearchInput] = useState("Search user..")
  const defaultSearch = 'Search user..'

  useEffect(() => {
    function findUsers(value) {
      const result = users.filter(user => user.email.toLowerCase().includes(value.toLowerCase()) && !userInList(user))
      setUserList(result)
    }
    findUsers(searchInput)
  }, [searchInput])

  function handleInputFocus() {
    const result = users.filter(user => !userInList(user))
    setUserList(result)
  }

  function handleClick(userId) {
    const selectedUser = users.find((user) => user.id === userId)
    setSelectedUsers([...selectedUsers, selectedUser])
    setUserList([])
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
          <input onChange={e => setSearchInput(e.target.value)} 
                  onBlur={e => setSearchInput(defaultSearch)} 
                  onFocus={e => setSearchInput('')} 
                  value={searchInput}/>
          {searchInput && <ul className={styles.listUsers}>{listUsers}</ul>}
        </div>
      </div>
    </div>
  )
}

export default SearchUsers