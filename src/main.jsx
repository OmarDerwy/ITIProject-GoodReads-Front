// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//Mantine
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({

});

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <MantineProvider theme={theme} defaultColorScheme='dark'>
    <App />
  </MantineProvider>
  // </StrictMode>,
)
