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
