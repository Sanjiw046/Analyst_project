import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/LandingPage/Landing";
import Home from "../pages/home/Home";
import Layout from "../Layout";
import Signup from "../pages/signup/SignUp";
import Login from "../pages/login/Login"
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../utils/ProtectedRoute.jsx";

export const routing = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Landing/>,
            },
            {
                path:'/home',
                element:<Home/>,
                children:[
                    
                ]
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute allowedRoles={["admin", "analyst"]}>
                     <Dashboard />
                    </ProtectedRoute>
                )
            }
        ]


    },
    
])