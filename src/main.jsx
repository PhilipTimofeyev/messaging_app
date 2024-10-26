import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import SignIn from './components/SignIn.jsx';
import Register from './components/Register.jsx';
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <PrivateRoute isAuthenticated={isAuthenticated}><App /></PrivateRoute>
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
