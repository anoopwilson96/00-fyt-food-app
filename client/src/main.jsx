import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './index.css'
import { Toaster } from 'react-hot-toast';
import { UserLayout } from './layout/UserLayout.jsx';
import {LandingLayout}from './layout/LandingLayout.jsx'
import ErrorPage from './components/error-page.jsx';
import { HomePage } from './pages/user/homePage.jsx';
import { LoginPage } from './pages/landing/LoginPage.jsx';
import { CartPage} from './pages/user/CartPage.jsx'
import { HomepageLanding } from './pages/landing/homepageLanding.jsx';
import { SignupLanding } from './pages/landing/signupLanding.jsx';




const router = createBrowserRouter([
  {
    path: "",
    element:<LandingLayout/> ,
    errorElement: <ErrorPage />,
    children: [

      {
        path: "",
        element: <HomepageLanding/>
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "signup",
        element: <SignupLanding/>
      }
    ],
  },



  {
    path: "user",
    element: (<UserAuth> 
                <UserLayout/> 
             </UserAuth>),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage/>
      },

      {
        path: "cart",
        element: <CartPage/>
      }
    ]
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)
