// src/components/Filter.tsx
import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

interface FilterProps {
  setFilter: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  return (
    <FilterContainer>
      <button onClick={() => setFilter('PR Open')}>PR Open</button>
      <button onClick={() => setFilter('PR Merged')}>PR Merged</button>
      <button onClick={() => setFilter('Commits')}>Commits</button>
      <button onClick={() => setFilter('PR Reviewed')}>PR Reviewed</button>
      <button onClick={() => setFilter('PR Comments')}>PR Comments</button>
      <button onClick={() => setFilter('Incident Alerts')}>Incident Alerts</button>
      <button onClick={() => setFilter('Incidents Resolved')}>Incidents Resolved</button>
      <button onClick={() => setFilter('all')}>All</button>
    </FilterContainer>
  );
};

export default Filter;
