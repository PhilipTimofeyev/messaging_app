import React from 'react'

function Group({group, user}) {
  const ListGroupUsers = () => {
    return (
      <ul>
        {group.users.map((groupUser) => {
          if (groupUser.id !== user.id)
          return (
            <li key={groupUser.id } >
              <h4>{groupUser.email}</h4>
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