import { useState, useRef } from 'react'
import { RouterProvider, createBrowserRouter, BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import MainPage from './components/MainPage.jsx';
import PrivateRoute from "./components/PrivateRoute";
import SignIn from './components/SignIn.jsx';
import Register from './components/Register.jsx';

function App() {

  const router = createBrowserRouter([
      {
        path: "/",
        element: 
          <PrivateRoute isAuthenticated={true}/>,
        children: [
          {path: '/', element: <MainPage />},
        ],
      },
    {
      path: "signin",
      element: <SignIn />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

