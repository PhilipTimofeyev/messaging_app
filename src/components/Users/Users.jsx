import { React, useState, useEffect } from 'react'
import styles from './Users.module.css'
import { getUsersAPI } from "../../helpers/apiCalls.js";

function Users({ selectedUsers, setSelectedUsers }) {

  const [users, setUsers] = useState()

  useEffect(() => {
    const getUsers = async () => {
      const response = await getUsersAPI();
      setUsers(response.data)
    }
    getUsers() 
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


  return (
    <div className={styles.usersContainer}>
      <h1>Users</h1>
      {users && <SearchUsers users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>}
      <div className={styles.selectedUsers}>
      <h2>Send To:</h2>
      <ul>{listSelectedUsers}</ul>
      </div>
    </div>
  )
}

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
    <>
      <div className={styles.searchBar}>
        <label>
          Search Users: 
            <input onFocus={handleInputFocus} onChange={e => findUsers(e.target.value)}/>
        </label>
      </div>
      <ul>{userList && listUsers}</ul>
    </>
  )

}

export default Users
