//mantine styles
import '@mantine/core/styles.css';
//mantine core
import { createTheme, MantineProvider } from '@mantine/core';


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/general/navbar';
import './App.css'

const theme = createTheme({

});
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MantineProvider theme={theme}>
        <Navbar />
      </MantineProvider>
    </>
  )
}

export default App
