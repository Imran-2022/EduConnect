import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/Home/Home';
import Available_Tution from './components/Tution/Available_Tution';
import Profile from './components/Profile/Profile'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Forget from './components/Auth/Forget';
import About from './components/About/About';
import Stat from './components/Project_stat/Stat';
import Tuition_details from './components/Tution/Tution_details';
import AvailableTutor from './components/AvailableTutor/AvailableTutor';
import TutorDetail from './components/AvailableTutor/TutorDetail';
import CreateProfile from './components/Profile/CreateProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home/>
      }, 
      {
        path: '/tuition',
        element: <Available_Tution/>
      }, 
      {
        path: '/available_tutor',
        element: <AvailableTutor/>
      }, 
      {
        path: '/available_tutor/:id',
        element: <TutorDetail/>
      }, 
      {
        path: '/tuition/:id',
        element: <Tuition_details/>
      }, 
      {
        path: '/profile',
        element: <Profile/>
      }, 
      {
        path: '/profile/create',
        element: <CreateProfile/>
      }, 
      {
        path: '/statistics',
        element: <Stat/>
      }, 
      {
        path: '/about',
        element: <About/>
      }, 
      {
        path: '/login',
        element: <Login/>
      }, 
      {
        path: '/register',
        element: <Register/>
      }, 
      {
        path: '/forget-password',
        element: <Forget/>
      }, 
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
