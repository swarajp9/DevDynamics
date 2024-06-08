// src/components/Dashboard.tsx
import React, { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar
} from 'recharts';
import styled from 'styled-components';
import Filter from './Filter.tsx';

const ChartContainer = styled.div`
  margin-top: 20px;
`;

interface ActivityMeta {
  label: string;
  fillColor: string;
}

interface TotalActivity {
  name: string;
  value: string;
}

interface DayWiseItem {
  count: string;
  label: string;
  fillColor: string;
}

interface DayWiseActivity {
  date: string;
  items: {
    children: DayWiseItem[];
  };
}

interface Row {
  name: string;
  totalActivity: TotalActivity[];
  dayWiseActivity: DayWiseActivity[];
}

interface AuthorWorklog {
  activityMeta: ActivityMeta[];
  rows: Row[];
}

interface DashboardProps {
  data: AuthorWorklog | null;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [filter, setFilter] = useState('all');

  const filteredActivityMeta = useMemo(() => {
    if (!data) return [];
    return filter === 'all'
      ? data.activityMeta
      : data.activityMeta.filter(meta => meta.label === filter);
  }, [filter, data]);

  const totalActivityData = useMemo(() => {
    if (!data) return [];
    return data.rows.map(row => {
      const activity = { name: row.name } as any;
      row.totalActivity.forEach(act => {
        if (filter === 'all' || act.name === filter) {
          activity[act.name] = Number(act.value);
        }
      });
      return activity;
    });
  }, [filter, data]);

  const dayWiseData = useMemo(() => {
    if (!data) return [];
    return data.rows.flatMap(row => 
      row.dayWiseActivity.map(day => {
        const activity = { date: day.date } as any;
        day.items.children.forEach(item => {
          if (filter === 'all' || item.label === filter) {
            activity[item.label] = Number(item.count);
          }
        });
        return activity;
      })
    );
  }, [filter, data]);

  if (!data || !data.rows) {
    return <div>No data available</div>;
  }

  return (
    <>
      <Filter setFilter={setFilter} />
      <ChartContainer>
        <h2>Total Activity</h2>
        <BarChart width={600} height={300} data={totalActivityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {filteredActivityMeta.map(meta => (
            <Bar key={meta.label} dataKey={meta.label} fill={meta.fillColor} />
          ))}
        </BarChart>
      </ChartContainer>
      <ChartContainer>
        <h2>Day Wise Activity</h2>
        <LineChart width={600} height={300} data={dayWiseData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {filteredActivityMeta.map(meta => (
            <Line key={meta.label} type="monotone" dataKey={meta.label} stroke={meta.fillColor} />
          ))}
        </LineChart>
      </ChartContainer>
    </>
  );
};

export default Dashboard;
