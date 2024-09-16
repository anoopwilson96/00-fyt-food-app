import React from 'react'
import { AdminHeader } from '../pages/admin/adminHeader'

import { AdminFooter } from '../pages/admin/AdminFooter'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
  return (
    <>
<AdminHeader/>
<Outlet/>
<AdminFooter/>


    </>
  )
}
