import { useState, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import axios from "axios";
import './App.css'
import MainPage from './components/MainPage.jsx';
import PrivateRoute from "./components/PrivateRoute";
import SignIn from './components/SignIn.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx'


function App() {

  const [userAuth, setUserAuth] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function handleClick() {

    refreshToken()

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/users/tokens/info');
        setUserAuth(response.data)
        console.log('Data successfully fetched:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
    
  }

  const router = createBrowserRouter([
      {
        path: "/",
        element: 
          <PrivateRoute isAuthenticated={isAuthenticated} setUserAuth={setUserAuth} children={<MainPage user={userAuth} />} />,
        children: [
          {path: '/profile', element: <Profile user={userAuth} />},
        ],
      },
    {
      path: "signin",
      element: <SignIn setUserAuth={setUserAuth}/>,
    },
    {
      path: "register",
      element: <Register setUserAuth={setUserAuth} />,
    },
  ]);

  return (
    <>
      {<RouterProvider router={router} />}
      <button onClick={handleClick}>Click me</button>
    </>
  )
}

export default App

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  headers: {
    "Content-type": "application/json",
  }
});

function refreshToken() {
  axiosInstance.interceptors.request.use(request => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  }, error => {
    return Promise.reject(error);
  });
  axiosInstance.interceptors.response.use(
    response => response, // Directly return successful responses.
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
        try {
          const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the stored refresh token.
          const response = await axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/users/tokens/refresh',
            headers: { 'Authorization': 'Bearer ' + refreshToken }
          })

          const accessToken = response.data.token
          const newRefreshToken = response.data.refresh_token

          // Store the new access and refresh tokens.
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          // Update the authorization header with the new access token.
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest); // Retry the original request with the new access token.
        } catch (refreshError) {
          // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/signin';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
}