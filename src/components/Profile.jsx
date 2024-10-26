import React from 'react'

function Profile({user}) {
    const userInfo = user.resource_owner

  return (
    <div>
      <h1>Profile</h1>
          <h2>{user && userInfo.email}</h2>
    </div>
  )
}

export default Profile
