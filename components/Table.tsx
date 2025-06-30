interface TableProps {
  headers: string[];
  rows: any[];
  onView?: (xml: string) => void;
}
export default function Table({ headers, rows, onView }: TableProps) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{ borderBottom: '2px solid #ccc', padding: '0.5rem' }}>{h}</th>
          ))}
          {onView && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {headers.map((h, j) => (
              <td key={j} style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>{row[h]}</td>
            ))}
            {onView && (
              <td style={{ textAlign: 'center' }}>
                <button onClick={() => onView(row.Xml)}>View</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}