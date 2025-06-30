import { useEffect, useState } from 'react';
import axios from '../lib/api';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Table from '../components/Table';
import Modal from '../components/Modal';
import ChartBar from '../components/Chart';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>({});
  const [failedList, setFailedList] = useState<any[]>([]);
  const [selectedXml, setSelectedXml] = useState<string>('');
  const [showFailedOnly, setShowFailedOnly] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const metricsRes = await axios.get('/api/dashboard/metrics');
      setMetrics(metricsRes.data);

      const failedRes = await axios.get('/api/dashboard/failed-request-xmls');
      setFailedList(failedRes.data);
    } catch (err) {
      alert('API error: ' + err.message);
    }
  };

  const sendXml = async () => {
    try {
      const res = await axios.post('/api/dashboard/send-confirmation-manually', {
        xml: selectedXml,
      });
      alert('Sent: ' + res.data.status);
      setSelectedXml('');
      fetchDashboard();
    } catch (err) {
      alert('Send failed: ' + err.message);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />

      <div style={{ padding: '2rem' }}>
        <h2 style={{ color: '#2e7d32' }}>Dashboard Overview</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          maxWidth: '900px',
          margin: '2rem auto',
          cursor: 'pointer'
        }}>
          <div onClick={() => setShowFailedOnly(false)}><Card title="Total" value={metrics.totalRequests || 0} /></div>
          <div onClick={() => setShowFailedOnly(false)}><Card title="Confirmation Success" value={metrics.successRequests || 0} /></div>
          <div onClick={() => setShowFailedOnly(false)}><Card title="Confirmation Pending" value={metrics.pendingConfirmations || 0} /></div>
          <div onClick={() => setShowFailedOnly(true)}><Card title="Confirmation Failed" value={metrics.confirmationFailedRequests || 0} /></div>
          <div onClick={() => setShowFailedOnly(false)}><Card title="Request Success At MDM" value={metrics.totalRequests - metrics.failedRequests || 0} /></div>
          <div onClick={() => setShowFailedOnly(false)}><Card title="Request Failed At MDM" value={metrics.failedRequests || 0} /></div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <ChartBar metrics={metrics} />
        </div>

        {showFailedOnly && (
          <>
            <h3>Failed Confirmation Requests</h3>
            <Table
              headers={['LogId']}
              rows={failedList.map(f => ({ LogId: f.logId, Xml: f.xml }))}
              onView={(xml) => setSelectedXml(xml)}
            />
            {selectedXml && (
              <Modal
                xml={selectedXml}
                setXml={setSelectedXml}
                onClose={() => setSelectedXml('')}
                onSend={sendXml}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
