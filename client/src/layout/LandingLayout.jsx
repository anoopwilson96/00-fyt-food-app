import React from 'react';
import { DarkMode } from '../UI/DarkMode';
import { HeaderLanding } from '../pages/landing/headerLanding';
import { FooterLanding } from '../pages/landing/footerLanding';
import { HomepageLanding } from '../pages/landing/homepageLanding';
import { Outlet } from 'react-router-dom';

export const LandingLayout = () => {
  return (
    <main className="min-h-screen bg-base-100 flex flex-col">


      <HeaderLanding/>
      <Outlet/>
      <FooterLanding/>

    </main>
  );
};
