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
  const [extraData, setExtraData] = useState({});
  const [active, setActive] = useState(null);
  const buttons = [
    {
      label: 'Users',
      api: '/api/users/',
    },
    {
      label: 'Books',
      api: '/api/books/',
    },
    {
      label: 'Authors',
      api: '/api/authors/',
    },
    {
      label: 'Categories',
      api: '/api/categories/',
    }
  ];

  const handleNewData = (api) => {
    setData([])
    axiosInstance.get(api)
      .then((response) => {
        console.log(response, typeof(response.data));
        if(!Array.isArray(response.data)){
          setData(response.data.array);
          setExtraData({...response.data, array: undefined}); //use this maybe
        }else{
        setData(response.data);
        }
      })
  };
  const items = buttons.map((button, index) => (
    <NavLink
      href='#'
      key={index}
      label={button.label}
      onClick={() => {setActive(index);handleNewData(button.api)}}
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
          {data.length > 0 ? <TableSort currentApi={buttons[active].api} handleNewData={handleNewData} data={data} dataHeader={buttons[active].label} /> : <p>No Data Retrieved</p>}
        </AppShell.Main>
    </AppShell>
  )
}
