import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import SignIn from './components/SignIn.jsx';
import Register from './components/Register.jsx';
import Hmm from './components/Hmm.jsx';
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <PrivateRoute isAuthenticated={false}>
        <App />
      </PrivateRoute>,
    children: [
      {path: '/', element: <App />},
      {path: 'hmm', element: <Hmm />},
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
