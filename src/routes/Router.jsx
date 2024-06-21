import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage';
import Layout from '../components/Layout';
import Auth from '../pages/Auth';
import Login from '../pages/Login';
import Survey from '../pages/Survey';


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
  },
  {
    path: '/survey',
    element: <Survey />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/auth',
    element: <Auth />
  }
]);

export default Router;
