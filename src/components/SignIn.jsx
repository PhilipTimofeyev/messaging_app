import { React, useState, useEffect } from 'react'
import { Navigate, Link } from "react-router-dom";
import styles from "./SignIn.module.css"

function SignIn () {

  const [user, setUser] = useState()
  const [error, setError] = useState()

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')
    // console.log([email, password])
    let response = await api({email: email, password: password})
  }

    return (
      <div>
        <h1>Sign In</h1>
        {error && <p>{error.message}</p>}
        {user && (
          <Navigate to="/" replace={true} />
        )}
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
        </form>
      </div>
    );
}

export default SignIn



// API sketch
// const [error, setError] = useState()
// const [data, setData] = useState([]);
// const [isLoading, setIsLoading] = useState(true);
// async function handleSubmit(e) {
//   event.preventDefault();
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       "email": "test2@development.com",
//       "password": "123456"
//     })
//   };

//   const formData = new FormData(e.target)
//   const email = formData.get('email')
//   console.log(email)
//   setIsLoading(true);
async function api({email: email, password: password}) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": {email},
        "password": {password}
      })
    };
  try {
    const response = await fetch('http://127.0.0.1:3000/users/tokens/sign_in', requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    console.log(jsonData)
    return jsonData
  } catch (error) {
    // setError(error)
  } finally {
    // setIsLoading(false);
  }
}