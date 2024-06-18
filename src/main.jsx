import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import QueryClientSetup from './QueryClientSetup.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientSetup>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientSetup>
  </React.StrictMode>
);
