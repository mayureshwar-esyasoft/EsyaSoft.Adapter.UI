// components/SuccessRate.tsx
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
  label: string;
  value: number;
}

export default function SuccessRate({ label, value }: Props) {
  return (
    <div style={{ textAlign: 'center', width: '120px', margin: '1rem auto' }}>
      <h4 style={{ marginBottom: '0.5rem' }}>{label}</h4>
      <CircularProgressbar
        value={value}
        text={`${value.toFixed(0)}%`}
        styles={buildStyles({
          textColor: '#2e7d32',
          pathColor: '#4caf50',
          trailColor: '#e0e0e0',
        })}
      />
    </div>
  );
}
