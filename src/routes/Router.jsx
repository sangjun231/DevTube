import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage';
import Layout from '../components/Layout';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/profile',
        element: <MyPage />
      }
    ]
  }
]);

export default Router;
