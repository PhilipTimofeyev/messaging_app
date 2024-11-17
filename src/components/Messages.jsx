import React from 'react'
import styles from './Messages.module.css'
import { createMessageAPI } from "../helpers/apiCalls.js";

function Messages({ user, setMessage, currentGroup }) {

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const content = formData.get('content')
        const newMessage = await createMessage(content)
        setMessage(newMessage)
        e.target.reset()
    }

    async function createMessage(content) {
        const response = await createMessageAPI(content);
        const newMessage = response.data
        return newMessage
    }

    const listUsers = currentGroup.users.map((groupUser) => {
        if (user.id === groupUser.id) return
        return (
            <li key={groupUser.id}>
                <h2>{groupUser.email}</h2>
            </li>
        )
    })

  return (
    <div className={styles.messagesContainer}>
        <ul className={styles.messageUsers}>{listUsers}</ul>
        {currentGroup && <MessagesWindow user={user} currentGroup={currentGroup}/>}
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type='content' name='content'></input>
            <button type="submit" >Send</button>
        </form>
    </div>
  )
}

function MessagesWindow({currentGroup, user}) {
    const listMessages = currentGroup.messages.map((message, idx) => {
        const messageUser = currentGroup.users.find(user => user.id === message.user_id)
        const isCurrentUser = user.id == message.user_id
        let previousUser
        if (idx > 0) {previousUser = currentGroup.messages[idx - 1].user_id}
        const isPreviousUser = previousUser === messageUser.id
        return (
            <li key={message.id} className={isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage}>
                { !isPreviousUser && <h5>{messageUser.email}</h5>}
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
