import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider> {/* Wrap the app with ChakraProvider */}
      <App />
    </ChakraProvider>
  </StrictMode>
);
