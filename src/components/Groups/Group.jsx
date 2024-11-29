import React from 'react'

function Group({group, user}) {
  const ListGroupUsers = () => {
    return (
      <ul>
        {group.users.map((groupUser) => {
          let userName = groupUser.email.match(/^[^@]*/gm)[0]
          userName = userName.charAt(0).toUpperCase() + userName.slice(1)
          if (groupUser.id !== user.id)
          return (
            <li key={groupUser.id } >
              <h4>{userName}</h4>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
      <ListGroupUsers/>
    )
}

export default Group