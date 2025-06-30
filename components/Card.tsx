interface CardProps {
  title: string;
  value: number | string;
  color?: string;
}

export default function Card({ title, value, color = '#c8e6c9' }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: color,
        padding: '1rem',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h3 style={{ margin: '0 0 0.5rem 0' }}>{title}</h3>
      <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{value}</div>
    </div>
  );
}
