import { React, useState, useEffect } from 'react'
import { Navigate, Link } from "react-router-dom";
import styles from "./SignIn.module.css"
import { useApi }  from '../hooks/useApi.js'
import ErrorMessage  from './ErrorMessage.jsx'

function Register({ setUserAuth }) {

    const [requestOptions, setRequestOptions] = useState()
    const url = 'http://127.0.0.1:3000/users/tokens/sign_up'

    const {data, isLoading, error} =  useApi(url, requestOptions)

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')
        const password_confirmation = formData.get('password_confirmation')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "email": `${ email }`,
                    "password": `${ password }`,
                    "password_confirmation": `${ password_confirmation }`
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
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Create a new account:</h3>
            <div className={styles.formInput}>
                <label htmlFor="email"><b>Email:</b> </label>
                <input type="email" name="email" />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="password"><b>Password:</b> </label>
                <input type="password" name="password" />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="password_confirmation"><b>Confirm Password:</b> </label>
                <input type="password" name="password_confirmation" />
            </div>
            <div className={styles.formButtonLink}>
                <Link to="/signin">Sign in</Link>
                <button type="submit">Register</button>
            </div>
          {error && <ErrorMessage error = {error}/>}
        </form>
          {data && (
              <Navigate to="/" replace={true} />
          )}
    </div>
  )
}

export default Register
