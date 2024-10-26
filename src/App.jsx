import { useState, useRef } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'
import { Link } from "react-router-dom";

function App() {

  return (
    <>
      <h1>Messenger</h1>
      <nav>
        <ul>
          <li>
            <Link to="signin">Sign in page</Link>
            <Link to="hmm">Hmmmmm</Link>
          </li>
        </ul>
      </nav>
      {/* <Outlet /> */}
    </>
  )
}

export default App

