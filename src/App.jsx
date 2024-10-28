import { useState, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import MainPage from './components/MainPage.jsx';
import PrivateRoute from "./components/PrivateRoute";
import SignIn from './components/SignIn.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx'
import { axiosInstance } from './helpers/refreshToken.js'


function App() {

  const [userAuth, setUserAuth] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
    </>
  )
}

export default App