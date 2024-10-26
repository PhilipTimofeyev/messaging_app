import React from 'react'
import { Navigate, Link } from "react-router-dom";
import styles from "./SignIn.module.css"

function Register() {

    function handleSubmit() {

    }


  return (
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Please sign in:</h3>
            <div className={styles.formInput}>
                <label htmlFor="email"><b>Email:</b> </label>
                <input type="email" name="email" />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="password"><b>Password:</b> </label>
                <input type="password" name="password" />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="confirm_password"><b>Confirm Password:</b> </label>
                <input type="password" name="confirm_password" />
            </div>
            <div className={styles.formButtonLink}>
                <Link to="/signin">Sign in</Link>
                <button type="submit">Sign up</button>
            </div>
        </form>
      
    </div>
  )
}

export default Register
