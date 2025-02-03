import React, { useEffect, useState } from 'react'
import { AppShell, Center, NavLink  } from '@mantine/core';
import BooksLogo from '/Logomark.svg';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Admin() {
  const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (location.pathname === '/admin') {
  //     navigate('/admin/users');
  //   }
  // }, [location, navigate]);
  return (
    <AppShell 
      header={{height: 60}}
      navbar={{
        width: 100,
        breakpoint: 'sm',
      }}
      padding="md">
      <AppShell.Header ><Center><img src={BooksLogo} ></img></Center></AppShell.Header>
      <AppShell.Navbar>
        <NavLink
          label='Users'
          component='a'
          href='/admin/users'
          active={location.pathname === '/admin/users'}
        >
        </NavLink>
        </AppShell.Navbar>
        <AppShell.Main>

        </AppShell.Main>
    </AppShell>
  )
}
