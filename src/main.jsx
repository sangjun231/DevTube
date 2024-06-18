import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import QueryClientSetup from './QueryClientSetup.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientSetup>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientSetup>
  </React.StrictMode>
);
