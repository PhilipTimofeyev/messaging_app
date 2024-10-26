import { useState, useRef } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import MainPage from './components/MainPage.jsx';
import PrivateRoute from "./components/PrivateRoute";
import SignIn from './components/SignIn.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx'


function App() {

  const [userAuth, setUserAuth] = useState(null)

  const router = createBrowserRouter([
      {
        path: "/",
        element: 
          <PrivateRoute isAuthenticated={userAuth} children={<MainPage/>} />,
        children: [
          {path: '/profile', element: <Profile />},
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
      <RouterProvider router={router} />
    </>
  )
}

export default App

