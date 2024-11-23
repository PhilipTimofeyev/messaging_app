import { React, useState, useEffect } from 'react'
import Users from './Users/Users';
import Groups from './Groups/Groups';
import Messages from './Messages';
import styles from './MainPage.module.css'


function MainPage({ user }) {

  const [currentGroup, setCurrentGroup] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [message, setMessage] = useState()
  const [showGroups, setShowGroups] = useState({display: 'block'})

  function revealGroups() {
    if (showGroups.display === 'block') {
      setShowGroups({display: 'none'})
    } else {
      setShowGroups({display: 'block'})
    }
  }

  useEffect(() => {
    if (window.innerWidth < window.innerHeight) {
      setShowGroups({ display: 'none' })
    }
  }, [currentGroup])

  return (
    <>
      <div className={styles.mainPageContainer}>
        <button className={styles.revealGroupsBtn} onClick={revealGroups}><b>Groups</b></button>
        <div className={styles.sidebarContainer} style={showGroups}>
          <Groups user={user} setSelectedUsers={setSelectedUsers} message={message}  selectedUsers={selectedUsers} setCurrentGroup={setCurrentGroup} currentGroup={currentGroup}/>
        </div>
        <div>
          <Users selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
          {currentGroup && <Messages setMessage={setMessage} currentGroup={currentGroup} user={user} message={message} />}
        </div>
      </div>
    </>
  )
}

export default MainPage
