import { useEffect, useState } from 'react';
import axios from '../lib/api';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Modal from '../components/Modal';
import PieDistribution from '../components/PieDistribution';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>({});
  const [failedList, setFailedList] = useState<any[]>([]);
  const [selectedXml, setSelectedXml] = useState<string>('');
  const [showFailedBox, setShowFailedBox] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const paginatedData = failedList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(failedList.length / itemsPerPage);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const metricsRes = await axios.get('/api/dashboard/metrics');
      setMetrics(metricsRes.data);
      const failedRes = await axios.get('/api/dashboard/failed-request-xmls');
      setFailedList(failedRes.data);
    } catch (err) {
      alert('API error: ' + err.message);
    } finally {
      setLoading(false);
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

  const handleCardClick = (type: string) => {
    setShowFailedBox(type === 'failed');
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div style={{ padding: '1.2rem' }}>
        <h2 style={{ color: '#2e7d32', fontSize: '1.3rem' }}>
          Overview For {new Date().toLocaleDateString('en-GB')}
        </h2>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.8rem',
          maxWidth: '900px',
          margin: '1.5rem auto',
          cursor: 'pointer'
        }}>
          <div onClick={() => handleCardClick('')}><Card title="Total" value={metrics.totalRequests || 0} /></div>
          <div onClick={() => handleCardClick('')}><Card title="Confirmation Success" value={metrics.successRequests || 0} /></div>
          <div onClick={() => handleCardClick('')}><Card title="Confirmation Pending" value={metrics.pendingConfirmations || 0} /></div>
          <div onClick={() => handleCardClick('failed')}><Card title="Confirmation Failed" value={metrics.confirmationFailedRequests || 0} /></div>
          <div onClick={() => handleCardClick('')}><Card title="Request Success At MDM" value={metrics.totalRequests - metrics.failedRequests || 0} /></div>
          <div onClick={() => handleCardClick('')}><Card title="Request Failed At MDM" value={metrics.failedRequests || 0} /></div>
        </div>

        {/* Chart + Table */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '1.2rem',
          flexWrap: 'wrap',
          marginTop: '0.5rem'
        }}>
          {/* Pie Chart */}
          <div style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            width: '370px',
            height: '370px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h3>Request Distribution</h3>
            {loading ? <p>Loading...</p> : <PieDistribution metrics={metrics} />}
          </div>

          {/* Table */}
          {showFailedBox && (
            <div style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              width: '460px',
              minHeight: '370px'
            }}>
              <h3 style={{ textAlign: 'center' }}>Failed Confirmation Requests</h3>
              <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f8e9' }}>
                    <th style={{ padding: '6px 10px', borderBottom: '1px solid #ccc', width: '70%' }}>LogId</th>
                    <th style={{ padding: '6px 10px', borderBottom: '1px solid #ccc', width: '30%' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, i) => (
                    <tr key={i}>
                      <td style={{ padding: '6px 10px', borderBottom: '1px solid #eee' }}>{row.logId}</td>
                      <td style={{ padding: '6px 10px', borderBottom: '1px solid #eee' }}>
                        <button onClick={() => setSelectedXml(row.xml)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: 'center', marginTop: '0.8rem' }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      margin: '0 4px',
                      padding: '0.35rem 0.6rem',
                      border: 'none',
                      backgroundColor: page === currentPage ? '#66bb6a' : '#e0e0e0',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}>
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedXml && (
          <Modal
            xml={selectedXml}
            setXml={setSelectedXml}
            onClose={() => setSelectedXml('')}
            onSend={sendXml}
          />
        )}
      </div>
    </div>
  );
}
