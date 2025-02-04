import React, { useEffect, useState } from 'react'
import { AppShell, Center, NavLink  } from '@mantine/core';
import BooksLogo from '/Logomark.svg';
import { useLocation, useNavigate } from 'react-router-dom';
//components
import { TableSort } from '../components/admin/TableSort';
//axios
import axiosInstance from '../apis/config';

export default function Admin() {
  const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (location.pathname === '/admin') {
  //     navigate('/admin/users');
  //   }
  // }, [location, navigate]);
  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);
  const buttons = [
    {
      label: 'Users',
      api: '/api/users',
    },
    {
      label: 'Books',
      api: '/api/books',
    }
  ];

  const handleNewData = (index, api) => {
    setActive(index);
    axiosInstance.get(api)
      .then((response) => {
        // setData(response.data);
        console.log(response);
      })
  };
  const items = buttons.map((button, index) => (
    <NavLink
      href='#required-for-focus'
      key={index}
      label={button.label}
      onClick={() => handleNewData(index, button.api)}
      active={index === active}>
    </NavLink>
  ));
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
        {items}
        </AppShell.Navbar>
        <AppShell.Main>
          {/* <TableSort></TableSort> */}
        </AppShell.Main>
    </AppShell>
  )
}
