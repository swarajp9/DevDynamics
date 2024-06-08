// src/App.tsx
import React, { useEffect, useState } from 'react';
import { fetchData } from './api.ts';
import Dashboard from './components/Dashboard.tsx';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: #f0f4f8;
  padding: 20px;
`;

const App: React.FC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  return (
    <AppContainer>
      <h1>Developer Activity Dashboard</h1>
      <Dashboard data={data} />
    </AppContainer>
  );
};

export default App;
