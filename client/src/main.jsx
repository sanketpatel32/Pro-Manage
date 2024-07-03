import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom"

import UserProvider from './context/UserContext.jsx';
import InterfaceProvider from './context/InterfaceContext.jsx';
import TaskProvider from './context/TaskContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <InterfaceProvider>
    <UserProvider>
      <BrowserRouter>
        <TaskProvider>
          <App />
          <ToastContainer />
        </TaskProvider>
      </BrowserRouter>
    </UserProvider>
  </InterfaceProvider>
)
