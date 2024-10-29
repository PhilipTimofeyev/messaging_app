import React from 'react'
import styles from './Messages.module.css'
import { createMessage, addMessageToGroup } from "../helpers/apiCalls.js";

function Messages({ user, currentGroup, refreshGroup }) {

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newMessage = formData.get('newMessage')
        const response = await createMessage(newMessage);
        const newMessageID = response.data.id
        const hmm = await addMessageToGroup(newMessageID, currentGroup.group.id)
        refreshGroup()
    }

  return (
    <div className={styles.messagesContainer}>
        {currentGroup && <MessagesWindow currentGroup={currentGroup}/>}
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type='newMessage' name='newMessage'></input>
            <button type="submit">Send</button>
        </form>
    </div>
  )
}


function MessagesWindow({currentGroup}) {

    const listMessages = currentGroup.messages.map((message) => {
        const messageUser = currentGroup.users.find(user => user.id === message.user_id)
        console.log(messageUser)
        return (
        <li key={message.id}>
            <p>{messageUser.email}</p>
            <p>{message.content}</p>
        </li>
        )
    }
    )


    return (
        <div className={styles.messagesWindow}>
            <ul>{listMessages}</ul>
        </div>
    )
}

export default Messages
