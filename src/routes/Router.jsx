import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage';
import Layout from '../components/Layout';
import QuestionForm from '../components/Survey/QuestionForm';


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
      },
      {
        path: '/survey',
        element: <QuestionForm />,
      }
    ]
  }
]);

export default Router;
