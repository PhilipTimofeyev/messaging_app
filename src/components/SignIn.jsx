import { React, useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";

function SignIn () {

  const [user, setUser] = useState()
  const [error, setError] = useState()

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')
    console.log([email, password])
    let response = await api()
  }

    return (
      <div>
        {error && <p>{error.message}</p>}
        {user && (
          <Navigate to="/" replace={true} />
        )}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" />
          <input type="password" name="password" />
          <button type="submit">Sign In</button>
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
async function api() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": "test2@development.com",
        "password": "123456"
      })
    };
  try {
    const response = await fetch('http://127.0.0.1:3000/users/tokens/sign_in', requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    // setData(jsonData);
    // let user = await login(event.target);
    console.log(jsonData)
    return jsonData
  } catch (error) {
    // setError(error)
  } finally {
    // setIsLoading(false);
  }
}