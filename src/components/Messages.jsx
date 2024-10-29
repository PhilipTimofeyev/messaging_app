import React from 'react'
import styles from './Messages.module.css'

function Messages({user, currentGroup}) {
  return (
    <div className={styles.messagesContainer}>
      {currentGroup && <MessagesWindow currentGroup={currentGroup}/>}
      <input></input>
    </div>
  )
}


function MessagesWindow({currentGroup}) {

    const listMessages = currentGroup.messages.map(message =>
        <li key={message.id}>
            <p>{message.content}</p>
        </li>
    )


    return (
        <div>
            <ul>{listMessages}</ul>
        </div>
    )
}

export default Messages
