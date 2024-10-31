import { React, useState, useEffect } from 'react'
import styles from './Users.module.css'
import { getUsersAPI } from "../../helpers/apiCalls.js";
import SearchUsers from './SearchUsers'

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
      <div className={styles.selectedUsers}>
      {users && <SearchUsers users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>}
      <ul>{listSelectedUsers}</ul>
      </div>
    </div>
  )
}


export default Users
