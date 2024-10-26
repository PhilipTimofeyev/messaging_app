import { React, useState, useEffect } from 'react'
import { Navigate, Link } from "react-router-dom";
import styles from "./SignIn.module.css"
import { useApi } from '../hooks/useApi.js'
import ErrorMessage from './ErrorMessage.jsx'

function SignIn({ setUserAuth }) {

  const [requestOptions, setRequestOptions] = useState()
  const url = 'http://127.0.0.1:3000/users/tokens/sign_in'

  const { data, isLoading, error } = useApi(url, requestOptions)

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "email": `${email}`,
          "password": `${password}`
        }
      )
    };
    setRequestOptions(requestOptions)
  }

  useEffect(() => {
    setUserAuth(data)
  }, [data])

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
        {data && (
          <Navigate to="/" replace={true} />
        )}
      </div>
    );
}

export default SignIn