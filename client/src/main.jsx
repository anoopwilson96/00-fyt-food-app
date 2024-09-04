import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import './index.css'
import { Toaster } from 'react-hot-toast';
import { UserLayout } from './layout/UserLayout.jsx';
import {LandingLayout}from './layout/LandingLayout.jsx'
import ErrorPage from './components/error-page.jsx';
import { HomePage } from './pages/user/HomePage.jsx';
import { LoginPage } from './pages/landing/LoginPage.jsx';
import { CartPage} from './pages/user/CartPage.jsx'
import { HomepageLanding } from './pages/landing/homepageLanding.jsx';
import { SignupLanding } from './pages/landing/signupLanding.jsx';
import { UserAuth } from './protected routes/UserAuth.jsx';
import { Profile } from './pages/user/profile.jsx';
import { MenuItem } from './pages/user/menuItem.jsx';
import { RestaurantPage } from './pages/user/restaurantPage.jsx';



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
        path:"my-profile",
        element: <Profile/>

      },
      {
        path:"menu-item/:id",
        element: <MenuItem/>
      },
      {
        path: "menu-item/:id/restaurant/:id" ,
        element: <RestaurantPage/>
      },
      {
        path: "restaurant/:id" ,
        element: <RestaurantPage/>
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
