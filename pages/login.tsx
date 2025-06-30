import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const isAuth = localStorage.getItem('auth');
    if (isAuth === 'true') {
      router.push('/singlercdcdashboard');
    }
  }, [router]);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('auth', 'true');
      router.push('/singlercdcdashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e8f5e9'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem 3rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px'
      }}>
        <img src="/logo.png" alt="Logo" style={{ height: 60, marginBottom: '1rem' }} />
        <h2 style={{ marginBottom: '1.5rem', color: '#2e7d32' }}>Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '1.5rem',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#66bb6a',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
