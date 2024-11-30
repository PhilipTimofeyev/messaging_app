import { React, useState } from 'react'
import styles from './Messages.module.css'
import { createMessageAPI } from "../helpers/apiCalls.js";
import logo from "../assets/send_logo.png";

function Messages({ user, setMessage, currentGroup }) {

    const [selectedImage, setSelectedImage] = useState()

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('message[content]', e.target.content.value)
        formData.append('message[image]', selectedImage)
        const newMessage = await createMessage(formData)
        setMessage(newMessage)
        setSelectedImage('')
        e.target.reset()
    }

    async function createMessage(formData) {
        const response = await createMessageAPI(formData);
        const newMessage = response.data
        return newMessage
    }

    function handleFileChange(e) {
        setSelectedImage(e.target.files[0])
    }

    function removeImage() {
        setSelectedImage('')
    }

    function AddImage() {
        if (selectedImage) {
            return (
                <p onClick={removeImage}>{selectedImage.name}</p>
            )
        } 
    }

    function MessageForm() {
        return (
            <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
                <label htmlFor="image"> Add Image</label>
                <input type="file" name="image" id='image' accept="image/png, image/jpeg" onChange={handleFileChange} hidden />
                <input type='content' name='content'></input>
                <button type="submit" className={styles.sendBtn}> <img src={logo} className={styles.logo} /></button>
                <AddImage />
            </form>
        )
    }

    const listUsers = currentGroup.users.map((groupUser) => {
        if (user.id === groupUser.id) return
        let userName = groupUser.email.match(/^[^@]*/gm)[0]
        userName = userName.charAt(0).toUpperCase() + userName.slice(1)
        return (
            <li key={groupUser.id}>
                <h3>{userName}</h3>
            </li>
        )
    })

  return (
    <div className={styles.messagesContainer}>
        <ul className={styles.messageUsers}>{listUsers}</ul>
        {currentGroup && <MessagesWindow user={user} currentGroup={currentGroup}/>}
        <MessageForm/>
    </div>
  )
}

function MessagesWindow({currentGroup, user}) {

    const listMessages = currentGroup.messages.map((message, idx) => {

        const messageUser = currentGroup.users.find(user => user.id === message.user_id)
        const isCurrentUser = user.id == message.user_id
        let previousUser

        // set previous user to decide whether to show username above message
        if (idx > 0) {previousUser = currentGroup.messages[idx - 1].user_id}
        const isPreviousUser = previousUser === messageUser.id
        let userName = messageUser.email.match(/^[^@]*/gm)[0]
        userName = userName.charAt(0).toUpperCase() + userName.slice(1)

        return (
            // styles the message based on if message is current user or other users
            <li key={message.id} className={isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage}>
                { !isPreviousUser && <h5>{userName}</h5>}
                {message.content && <p className={styles.messageContent}>{message.content}</p> }
                {message.image && <p className={styles.messageImage}> <img src={message.image}/></p>}
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
