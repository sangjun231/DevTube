import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/Auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />
  }
]);

export default router;
