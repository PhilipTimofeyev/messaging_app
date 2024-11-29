import { React, useState, useEffect } from 'react'
import styles from './Users.module.css'

function SearchUsers({users, selectedUsers, setSelectedUsers}) {

  const [userList, setUserList] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const defaultSearch = ''

  useEffect(() => {
    function findUsers(value) {
      const result = users.filter(user => user.email.toLowerCase().includes(value.toLowerCase()) && !userInList(user))
      setUserList(result)
    }
    if (searchInput) return findUsers(searchInput)
      setUserList([])
  }, [searchInput])

  function handleInputFocus() {
    setUserList(users)
  }

  function handleOnBlur() {
    setSearchInput(defaultSearch)
    setUserList([])
  }

  function handleClick(userId) {
    const selectedUser = users.find((user) => user.id === userId)
    setSelectedUsers([...selectedUsers, selectedUser])
    setUserList([])
  }

  const listUsers = userList.map(user => {
    if (selectedUsers.some(selectedUser => selectedUser.id == user.id)) return
    let userName = user.email.match(/^[^@]*/gm)[0]
    userName = userName.charAt(0).toUpperCase() + userName.slice(1)
    return (
    <li key={user.id} onMouseDown={() => handleClick(user.id)}>
      <p>{userName}</p>
    </li>
    )
  })

  function userInList(checkUser) {
    return selectedUsers.find(user => user.id === checkUser.id)
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBar}>
        <div>
          <input onChange={e => setSearchInput(e.target.value)} 
                  onBlur={handleOnBlur} 
                  onFocus={handleInputFocus} 
                  value={searchInput}
                  placeholder="Search users.." />
          {userList.length > 0 && <ul className={styles.listUsers}>{listUsers}</ul>}
        </div>
      </div>
    </div>
  )
}

export default SearchUsers