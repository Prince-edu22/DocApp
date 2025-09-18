import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: { initialColorMode: 'light', useSystemColorMode: false },
  fonts: { heading: 'Inter, system-ui, sans-serif', body: 'Inter, system-ui, sans-serif' },
  colors: {
    brand: {
      50: '#e6f0ff', 100: '#cce0ff', 200: '#99c2ff', 300: '#66a3ff', 400: '#3385ff',
      500: '#1E66FF', 600: '#1550cc', 700: '#0e3b99', 800: '#092766', 900: '#051433'
    },
    accent: {
      50: '#ffeef7', 100: '#ffd6ea', 200: '#ffadd5', 300: '#ff84c0', 400: '#ff5baa',
      500: '#ff3396', 600: '#cc2978', 700: '#991f5a', 800: '#66143c', 900: '#330a1e'
    },
    mint: {
      50: '#e7fff7', 100: '#c0ffe9', 200: '#99ffdb', 300: '#6ef6c9', 400: '#46eab7',
      500: '#22d3a6', 600: '#16a387', 700: '#0f7564', 800: '#094c42', 900: '#042a25'
    }
  },
  radii: { md: '12px', lg: '16px' },
  shadows: { outline: '0 0 0 3px rgba(30,102,255,0.35)' },
  components: {
    Button: {
      baseStyle: { borderRadius: '10px', fontWeight: 600 },
      variants: {
        solid: { bg: 'brand.500', _hover: { bg: 'brand.600' } },
        outline: { borderColor: 'brand.500', color: 'brand.600', _hover: { bg: 'brand.50' } }
      }
    },
    Card: { baseStyle: { container: { borderRadius: '14px', boxShadow: 'lg' } } }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
