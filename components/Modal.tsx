interface ModalProps {
  xml: string;
  setXml: (v: string) => void;
  onClose: () => void;
  onSend: () => void;
}
export default function Modal({ xml, setXml, onClose, onSend }: ModalProps) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <h3>Edit & Send XML</h3>
        <textarea
          rows={10}
          value={xml}
          onChange={e => setXml(e.target.value)}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button onClick={onSend}>Send</button>
          <button onClick={onClose} style={{ backgroundColor: '#ccc', color: '#000' }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}