import MainPage from './pages/MainPage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getTest = async () => {
  const response = await axios.get('http://localhost:4000/test');
  return response.data;
};

const getTestById = async () => {
  const response = await axios.get(`http://localhost:4000/test/${id}`);
  return response.data;
};

function App() {
  const {
    data: testData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['test'],
    queryFn: getTest
  });

  if (isPending) {
    return <div>Loading..</div>;
  }

  if (isError) {
    return <div>Error occured while fetching data.</div>;
  }

  return (
    <>
      {testData.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </>
  );
}

export default App;
