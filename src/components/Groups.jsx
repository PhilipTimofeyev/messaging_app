import React from 'react'

function Groups({groups}) {
    
    const listGroups = groups.map(group =>
        <li key={group.id}>
            <p>{group.title}</p>
        </li>
    )
    
  return (
    <div>
        <div>
              <ul>{groups && listGroups}</ul>
        </div>
    </div>
  )
}

export default Groups
