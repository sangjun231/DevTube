import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage';
import Layout from '../components/Layout';
import Auth from '../pages/Auth';
import Login from '../pages/Login';
import QuestionForm from '../pages/QuestionForm';


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
    element: <QuestionForm />
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
