import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';
import { HistoricalData } from '../types';

interface HistoryChartProps {
  data: HistoricalData[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  return (
    <Card 
        title="Level History Trends" 
        className="h-[400px]"
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}
    >
      <div className="w-full h-full p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
                dataKey="timestamp" 
                stroke="#94a3b8" 
                tick={{fill: '#94a3b8', fontSize: 10}} 
                minTickGap={30}
            />
            <YAxis 
                stroke="#94a3b8" 
                tick={{fill: '#94a3b8', fontSize: 10}} 
                domain={[0, 100]}
                label={{ value: 'Level (%)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                itemStyle={{ fontSize: 12 }}
                labelStyle={{ color: '#94a3b8', marginBottom: 5 }}
            />
            <Legend verticalAlign="top" height={36} iconType="plainline" />
            <Line type="monotone" dataKey="lock1" name="Lock 1" stroke="#0ea5e9" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="lock2" name="Lock 2" stroke="#22c55e" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="lock3" name="Lock 3" stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="lock4" name="Lock 4" stroke="#d946ef" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default HistoryChart;