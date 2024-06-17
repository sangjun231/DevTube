import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/Auth';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

export default router;
