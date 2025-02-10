import React, { useEffect, useState } from 'react'
import { AppShell, Center, NativeSelect, NavLink, Pagination, Space  } from '@mantine/core';
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
  const [active, setActive] = useState(0);
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

  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 10
  });
  useEffect(() => {
    handleNewData(buttons[active].api);
  }, [searchParams]);

  const handleNewData = (api) => {
    setData([])
    console.log(searchParams)
    axiosInstance.get(api, {params: searchParams})
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
      onClick={() => {setActive(index);setSearchParams({page: 1, limit: 10})}}
      active={index === active}>
    </NavLink>
  ));
  const handlePaginationChange = (page, limit) => {
    setSearchParams({...searchParams, page, limit});
  };
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
          {data? <>
          <TableSort 
            currentApi={buttons[active].api} 
            handleNewData={handleNewData} 
            data={data} 
            dataHeader={buttons[active].label} 
          />
          <Center gap='md'>

              <Pagination
                total={extraData.totalPages}
                value={searchParams.page}
                onChange={(page) => handlePaginationChange(page, searchParams.limit)}
              />
              <Space w='md'></Space>
              <NativeSelect
                data={['10', '20', '50', '100']}
                value={searchParams.limit.toString()}
                onChange={(event) => handlePaginationChange(searchParams.page, parseInt(event.currentTarget.value))}
              />
          </Center>
          </>
           : <p>No Data Retrieved</p>}
  
        </AppShell.Main>
    </AppShell>
  )
}

