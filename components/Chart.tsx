import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartBar({ metrics }: any) {
  const data = {
    labels: ['Success', 'Pending', 'Failed Confirm', 'MDM Failed'],
    datasets: [
      {
        label: 'Today',
        data: [
          metrics.successRequests || 0,
          metrics.pendingConfirmations || 0,
          metrics.confirmationFailedRequests || 0,
          metrics.failedRequests || 0
        ],
        backgroundColor: ['#66bb6a', '#ffee58', '#ef5350', '#8d6e63'],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      tooltip: {
        enabled: true
      }
    },
    cutout: '60%'
  };

  return (
    <div style={{ width: '400px', height: '400px', margin: 'auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
