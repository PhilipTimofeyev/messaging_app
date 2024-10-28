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

  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const router = createBrowserRouter([
      {
        path: "/",
        element: 
          <PrivateRoute isAuthenticated={isAuthenticated} setUser={setUser} children={<MainPage user={user} />} />,
        children: [
          { path: '/profile', element: <Profile user={user} />},
        ],
      },
    {
      path: "signin",
      element: <SignIn setUser={setUser}/>,
    },
    {
      path: "register",
      element: <Register setUser={setUser} />,
    },
  ]);

  return (
    <>
      {<RouterProvider router={router} />}
    </>
  )
}

export default App