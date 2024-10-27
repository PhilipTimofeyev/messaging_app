import { React, useState, useEffect } from 'react'
import NavBar from './NavBar';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useApi } from '../hooks/useApi.js'


function MainPage({ user }) {
  const navigate = useNavigate();
  const [requestOptions, setRequestOptions] = useState()
  
  const url = "http://127.0.0.1:3000/messages"
  const { data, isLoading, error } = useApi(url, requestOptions)
  
  const storedToken = localStorage.getItem('token')

  function handleClick() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + storedToken },
      body: JSON.stringify(
        {
          "message":
          {
            "content": "Message creation works!"
          }
        }
      )
    };
    setRequestOptions(requestOptions)
    
  }

  if (error) navigate("/signin", { state: { error }})

  return (
    <>
      <nav>
        <NavBar user={user}/>
      </nav>
      <Outlet/>
      <button onClick={handleClick}>Test</button>
    </>
  )
}

export default MainPage
