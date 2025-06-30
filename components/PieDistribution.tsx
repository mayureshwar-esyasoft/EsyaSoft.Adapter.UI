// components/PieDistribution.tsx
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

export default function PieDistribution({ metrics }: { metrics: any }) {
  const total = metrics.totalRequests || 0;
  const success = metrics.successRequests || 0;
  const failed = metrics.confirmationFailedRequests || 0;
  const pending = metrics.pendingConfirmations || 0;

  const data = [
    { name: 'Success', value: success },
    { name: 'Pending', value: pending },
    { name: 'Failed', value: failed }
  ];

  const COLORS = ['#66bb6a', '#fdd835', '#ef5350'];

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
