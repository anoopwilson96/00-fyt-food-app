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
import { OrderHistoryPage } from './pages/user/OrdersHistoryPage.jsx';
import { AdminLayout } from './layout/AdminLayout.jsx';
import { AdminHome } from './pages/admin/AdminHome.jsx';
import { RestaurantAdmin } from './pages/admin/restaurant/RestaurantAdmin.jsx';
import { AdminLoginPage } from './pages/admin/AdminLoginPage.jsx';
import { MenuAdmin } from './pages/admin/menu/MenuAdmin .jsx';
import { DishesAdmin } from './pages/admin/dishes/DishesAdmin .jsx';
import { UsersAdmin } from './pages/admin/UserAdmin.jsx';
import { AdminAuth } from './protected routes/AdminAuth.jsx';
import { AddRestaurant } from './pages/admin/restaurant/AddRestaurant.jsx';
import { EditRestaurant } from './pages/admin/restaurant/EditResturant.jsx';
import { EditMenuItem } from './pages/admin/menu/EditMenuItem.jsx';
import AddMenuItems from './pages/admin/menu/AddMenuItem.jsx';



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
        path: "order-history",
        element:<OrderHistoryPage/>
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
      },
      {
        path: "user/order-history/cart",
        element: <CartPage/>
      }
    ]
  },


  {
    path: "admin",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <AdminLoginPage />,
      },
      
      // Routes that need AdminAuth protection
      {
        element: <AdminAuth> <AdminLayout /></AdminAuth>,
        children: [
          {
            path: "",
            element: <AdminHome />,
          },
          {
            path: "manage-restaurant",
            element: <RestaurantAdmin />,
          },
          {
            path: "manage-restaurant/add-restaurant",
            element: <AddRestaurant/>
          },
          {
            path: "manage-restaurant/:id",
            element: <EditRestaurant/>
          },
          {
            path: "manage-menu",
            element: <MenuAdmin />,
          },
          {
            path: "manage-menu/:id" ,
            element: <EditMenuItem/>
          },
          {
            path: "manage-menu/add-menu",
            element: <AddMenuItems/>
          },
          {
            path: "manage-dishes",
            element: <DishesAdmin />,
          },
          {
            path: "manage-users",
            element: <UsersAdmin />,
          },
        ],
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
)
