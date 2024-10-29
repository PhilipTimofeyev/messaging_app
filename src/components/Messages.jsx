import React from 'react'
import styles from './Messages.module.css'
import { createMessageAPI, addMessageToGroupAPI } from "../helpers/apiCalls.js";

function Messages({ user, currentGroup, refreshGroup }) {

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const content = formData.get('content')
        const newMessage = await createMessage(content)
        
        await addMessageToGroupAPI(newMessage.id, currentGroup.group.id)
        refreshGroup()
    }

    async function createMessage(content) {
        const response = await createMessageAPI(content);
        const newMessage = response.data
        return newMessage
    }

    const listUsers = currentGroup.users.map((user) => {
        return (
            <li key={user.id}>
                <h4>{user.email}</h4>
            </li>
        )
    })

  return (
    <div className={styles.messagesContainer}>
        <ul className={styles.messageUsers}>{listUsers}</ul>
        {currentGroup && <MessagesWindow user={user} currentGroup={currentGroup}/>}
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type='content' name='content'></input>
            <button type="submit">Send</button>
        </form>
    </div>
  )
}


function MessagesWindow({currentGroup, user}) {

    const listMessages = currentGroup.messages.map((message) => {
        const messageUser = currentGroup.users.find(user => user.id === message.user_id)
        const isCurrentUser = user.id == message.user_id
        return (
            <li key={message.id} className={isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage}>
                <h5>{messageUser.email}</h5>
                <p className={styles.messageContent}>{message.content}</p>
            </li>
        )
    })

    return (
        <>
        <div className={styles.messagesWindow}>
            <ul>{listMessages}</ul>
        </div>
        </>
    )
}


export default Messages
