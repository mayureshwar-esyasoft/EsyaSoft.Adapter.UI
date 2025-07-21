import { useEffect, useState } from 'react';
import formatter from 'xml-formatter';

interface ModalProps {
  xml: string;
  setXml: (v: string) => void;
  onClose: () => void;
  onSend: () => void;
}

export default function Modal({ xml, setXml, onClose, onSend }: ModalProps) {
  const [formattedXml, setFormattedXml] = useState('');

  useEffect(() => {
    try {
      const pretty = formatter(xml, { indentation: '  ', collapseContent: true });
      setFormattedXml(pretty);
    } catch {
      setFormattedXml(xml); // fallback to raw
    }
  }, [xml]);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '700px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Edit & Send XML</h3>
        <textarea
          rows={18}
          value={formattedXml}
          onChange={e => {
            setFormattedXml(e.target.value);
            setXml(e.target.value); // keep synced with main state
          }}
          style={{
            width: '100%',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            whiteSpace: 'pre',
            overflowWrap: 'break-word'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button onClick={onSend}>Send</button>
          <button onClick={onClose} style={{ backgroundColor: '#ccc', color: '#000' }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
