import { useState, useRef } from 'react'
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
          </li>
        </ul>
      </nav>
    </>
  )
}

export default App

