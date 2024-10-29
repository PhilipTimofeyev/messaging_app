import { React, useState, useEffect } from 'react'
import NavBar from './NavBar';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Users from './Users';
import Groups from './Groups';
import { getGroups } from "../helpers/apiCalls.js";


function MainPage({ user, users }) {

  const [groups, setGroups] = useState()

  useEffect(() => {
    const callAPI = async () => {
      const response = await getGroups();
      setGroups(response.data)
      console.log(response.data)
    }
    callAPI()
  }, [])

  return (
    <>
      <nav>
        <NavBar user={user}/>
      </nav>
      <Outlet/>
      <h1>Users</h1>
      <div>
        {users && <Users users={users}/>}
      </div>
      <div>
        {groups && <Groups groups={groups} />}
      </div>
    </>
  )
}

export default MainPage
