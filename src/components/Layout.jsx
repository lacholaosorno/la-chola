import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Contact from './Contact';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Contact />
    </>
  );
};

export default Layout;
