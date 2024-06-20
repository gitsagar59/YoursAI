import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/Context.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

const router = createBrowserRouter([
    { path:"/", element: <App /> },
    { path:"/login", element: <Login />},
    { path:"/signup", element: <Signup /> }  
])

ReactDOM.createRoot(document.getElementById('root')).render (
  <ContextProvider>
    <RouterProvider router = {router} />
  </ContextProvider>
)
