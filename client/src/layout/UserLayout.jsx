import React from 'react'
import { Header } from '../pages/user/header'
import { Outlet } from 'react-router-dom'
import { Footer } from '../pages/user/footer'

export const UserLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>

  )
}
