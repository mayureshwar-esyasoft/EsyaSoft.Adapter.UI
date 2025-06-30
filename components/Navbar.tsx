import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const navItems = [
    { label: 'Single RC/DC Dashboard', href: '/singlercdcdashboard' },
    { label: 'Billing Status', href: '#' },
    { label: 'Audit Logs', href: '#' },
    { label: 'Settings', href: '#' },
  ];

  return (
    <nav style={{
      backgroundColor: '#e8f5e9',
      padding: '0.75rem 2rem',
      borderBottom: '1px solid #cfd8dc',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      gap: '2rem'
    }}>
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          style={{
            position: 'relative',
            paddingBottom: '0.25rem',
            fontWeight: 'bold',
            color: router.pathname === item.href ? '#2e7d32' : '#333',
            textDecoration: 'none',
            borderBottom: router.pathname === item.href ? '2px solid #2e7d32' : '2px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
