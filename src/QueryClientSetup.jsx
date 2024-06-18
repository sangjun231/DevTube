import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Children } from 'react';
const queryClient = new QueryClient();
const QueryClientSetup = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryClientSetup;
