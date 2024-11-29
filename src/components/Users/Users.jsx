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

  const listSelectedUsers = selectedUsers.map(user =>{
    let userName = user.email.match(/^[^@]*/gm)[0]
    userName = userName.charAt(0).toUpperCase() + userName.slice(1)
      return(
        <li key={user.id} onClick={() => removeSelectedUser(user.id)}>
          { userName }
        </li>
      )
    }
  )

  return (

      <div className={styles.selectedUsers}>
        {users && <SearchUsers users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>}
        <ul className={styles.listSelectedUsers}>{listSelectedUsers}</ul>
    </div>
  )
}


export default Users
