import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import MainPage from './components/MainPage.jsx';
import PrivateRoute from "./components/PrivateRoute";
import SignIn from './components/SignIn.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx'
import NavBar from './components/NavBar';


function App() {
  const [user, setUser] = useState()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute setUser={setUser} user={user}/>,
      children: 
      [
        { 
          path: '/', 
          element: <NavBar user={user}/>, 
          children: 
          [
            { path: '/', element: <MainPage user={user} /> },
            { path: '/profile', element: <Profile user={user} />},
          ],
        },
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