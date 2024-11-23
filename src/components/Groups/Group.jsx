import React from 'react'

function Group({group, user}) {
  const ListGroupUsers = () => {
    return (
      <ul>
        {group.users.map((groupUser) => {
          const userName = groupUser.email.match(/^[^@]*/gm)
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