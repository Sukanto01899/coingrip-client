import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import theme from '../theme.js';
import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      retry: 2,
      staleTime: 5 * 1000,
    },
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
 <QueryClientProvider client={queryClient}>
   <MantineProvider theme={theme} defaultColorScheme='auto'>
    <AuthContextProvider>
    <BrowserRouter>
    
    {/*Mantine Notification */}
    <Notifications/>
    {/* Whole App */}
    <App />
    {/* React query dev tool */}
    <ReactQueryDevtools/>
    
    </BrowserRouter>
    </AuthContextProvider>
  </MantineProvider>
 </QueryClientProvider>
  
)
