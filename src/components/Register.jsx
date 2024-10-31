import { React, useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import styles from "./SignIn.module.css"
import axios from "axios";
import ErrorMessage  from './ErrorMessage.jsx'

function Register({ setUser }) {
    const [error, setError] = useState()
    const navigate = useNavigate()
    const url = 'http://127.0.0.1:3000/users/tokens/sign_up'

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')
        const password_confirmation = formData.get('password_confirmation')

        axios
            .post(url, {
                "email": `${email}`,
                "password": `${password}`,
                "password_confirmation": `${password_confirmation}`,

            })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refreshToken', response.data.refresh_token);
                setUser(response.data)
                navigate("/")
            }).catch(error => {
                setError(error)
            })
    }

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
    </div>
  )
}

export default Register
