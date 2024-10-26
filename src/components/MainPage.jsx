import React from 'react'
import { Link } from "react-router-dom";

function MainPage() {
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
    </>
  )
}

export default MainPage
