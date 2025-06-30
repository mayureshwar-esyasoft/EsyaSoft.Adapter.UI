// components/SuccessGauge.tsx
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function SuccessGauge({ percent }: { percent: number }) {
  return (
    <div style={{ width: 120, height: 120 }}>
      <CircularProgressbar
        value={percent}
        text={`${percent}%`}
        styles={buildStyles({
          pathColor: '#4caf50',
          textColor: '#2e7d32',
          trailColor: '#d6d6d6',
          textSize: '16px'
        })}
      />
    </div>
  );
}
