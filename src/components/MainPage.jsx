import { React, useState, useEffect } from 'react'
import NavBar from './NavBar';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Users from './Users';
import Groups from './Groups';
import { getGroups, getGroup } from "../helpers/apiCalls.js";


function MainPage({ user, users }) {

  const [groups, setGroups] = useState()
  const [selectedGroup, setSelectedGroup] = useState()

  useEffect(() => {
    const callAPI = async () => {
      const response = await getGroups();
      setGroups(response.data)
      console.log(response.data)
    }
    callAPI()
  }, [])

  useEffect(() => {
    const callAPI = async () => {
      const response = await getGroup(selectedGroup.id);
      // setGroups(response.data)
      console.log(response.data)
    }
    console.log(selectedGroup)
    if (selectedGroup) callAPI()
  }, [selectedGroup])

  return (
    <>
      <nav>
        <NavBar user={user}/>
      </nav>
      <h1>Users</h1>
      <div>
        {users && <Users users={users}/>}
      </div>
      <div>
        {groups && <Groups groups={groups} setSelectedGroup={setSelectedGroup} />}
      </div>
    </>
  )
}

export default MainPage
