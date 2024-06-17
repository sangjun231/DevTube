import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage';
import Layout from '../components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/:id',
        element: <MyPage />
      }
    ]
  }
]);

export default router;
