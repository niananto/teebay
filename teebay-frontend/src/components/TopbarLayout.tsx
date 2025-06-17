import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Button, Group } from '@mantine/core';
import type { ReactNode } from 'react';

export default function TopbarLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <>
      <header
        style={{
          padding: '1rem',
          paddingTop: '0rem',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/">
          <img src="/teebay.png" alt="Teebay logo" style={{ height: '40px' }} />
        </Link>

        <Group gap="md">
          {user ? (
            <Link to="/products">
              <Button variant="outline">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button variant="light">Register</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </>
          )}
        </Group>
      </header>

      <main>{children}</main>
    </>
  );
}
