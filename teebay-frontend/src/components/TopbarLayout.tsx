import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Button, Group, Menu } from '@mantine/core';
import type { ReactNode } from 'react';

export default function TopbarLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();

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

        <Group gap="sm">
          {user ? (
            <>
              <Link to="/products">
                <Button variant="subtle">My Products</Button>
              </Link>
              <Link to="/products/browse">
                <Button variant="subtle">Browse Products</Button>
              </Link>
              <Link to="/products/add">
                <Button variant="subtle">Add Product</Button>
              </Link>
              <Link to="/transactions">
                <Button variant="subtle">Transactions</Button>
              </Link>
              <Menu shadow="md" width={160}>
                <Menu.Target>
                    <Button
                    variant="subtle"
                    leftSection={
                      <img
                      src={user.profilePicture || '/default-avatar.png'}
                      alt="Profile"
                      style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', }}
                      />
                    }
                    rightSection={
                      <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ display: 'block' }}
                      >
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }
                    >
                    {user.username}
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item component={Link} to="/profile">
                  Profile
                  </Menu.Item>
                  <Menu.Item color="red" onClick={logout}>
                  Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
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
