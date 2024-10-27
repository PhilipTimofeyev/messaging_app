import { React, useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./SignIn.module.css"
import ErrorMessage from './ErrorMessage.jsx'

function SignIn({ setUserAuth }) {
  const [error, setError] = useState()
  const navigate = useNavigate()
  const url = 'http://127.0.0.1:3000/users/tokens/sign_in'

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    axios
      .post(url, {
        "email": `${email}`,
        "password": `${password}`
      })
      .then((response) => {
        setUserAuth(response.data)
        localStorage.setItem('token', response.data.token);
        navigate("/")
      }).catch(error => {
        setError(error)
      })
  }

    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Please sign in:</h3>
          <div className={styles.formInput}>
            <label htmlFor="email"><b>Email</b> </label>
            <input type="email" name="email" />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="password"><b>Password</b> </label>
            <input type="password" name="password" />
          </div>
          <div className={styles.formButtonLink}>
            <Link to="/register">Register</Link>
            <button type="submit">Sign In</button>
          </div>
          {error && <ErrorMessage error={error} />}
        </form>
      </div>
    );
}

export default SignIn
