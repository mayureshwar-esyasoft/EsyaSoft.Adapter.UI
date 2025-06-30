import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('auth');
    router.push('/login');
  };

  return (
    <div style={{
      backgroundColor: '#388e3c',
      padding: '0.8rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
    }}>
      {/* Logo + Adapter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          height: '48px'
        }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: '40px', width: 'auto' }}
          />
        </div>
        <span style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          Adapter
        </span>
      </div>

      {/* Logout */}
      <div style={{ position: 'relative' }}>
        <span
          style={{ cursor: 'pointer', fontSize: '1.2rem' }}
          onClick={logout}
          title="Logout"
        >
          👤 Logout
        </span>
      </div>
    </div>
  );
}
