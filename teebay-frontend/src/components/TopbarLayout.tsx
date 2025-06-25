import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Button, Group, Menu, Avatar, Text } from '@mantine/core';
import { IconUser, IconLogout, IconShoppingBag, IconSearch, IconPlus, IconHistory } from '@tabler/icons-react';
import type { ReactNode } from 'react';

export default function TopbarLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <>
      <header
        style={{
          padding: '1rem 2rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/teebay.png" alt="Teebay logo" style={{ height: '40px' }} />
            <Text size="xl" fw={700} className="gradient-text">TeeBay</Text>
          </div>
        </Link>

        <Group gap="sm">
          {user ? (
            <>
              <Link to="/products" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="subtle" 
                  leftSection={<IconShoppingBag size={18} />}
                  className="hover-lift"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '12px'
                  }}
                >
                  My Products
                </Button>
              </Link>
              <Link to="/products/browse" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="subtle" 
                  leftSection={<IconSearch size={18} />}
                  className="hover-lift"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '12px'
                  }}
                >
                  Browse Products
                </Button>
              </Link>
              <Link to="/products/add" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="gradient"
                  gradient={{ from: '#667eea', to: '#764ba2' }}
                  leftSection={<IconPlus size={18} />}
                  className="hover-lift"
                  style={{ borderRadius: '12px' }}
                >
                  Add Product
                </Button>
              </Link>
              <Link to="/transactions" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="subtle" 
                  leftSection={<IconHistory size={18} />}
                  className="hover-lift"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '12px'
                  }}
                >
                  Transactions
                </Button>
              </Link>
              <Menu shadow="xl" width={200} position="bottom-end">
                <Menu.Target>
                  <Button
                    variant="subtle"
                    className="hover-lift"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '12px',
                      padding: '8px 12px'
                    }}
                  >
                    <Group gap="xs">
                      <Avatar
                        src={user.profilePicture || '/default-avatar.png'}
                        alt="Profile"
                        size={28}
                        radius="xl"
                      />
                      <Text size="sm" fw={500}>{user.username}</Text>
                    </Group>
                  </Button>
                </Menu.Target>
                <Menu.Dropdown style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px'
                }}>
                  <Menu.Item 
                    component={Link} 
                    to="/profile"
                    leftSection={<IconUser size={16} />}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item 
                    color="red" 
                    onClick={logout}
                    leftSection={<IconLogout size={16} />}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="light" 
                  className="hover-lift"
                  style={{ borderRadius: '12px' }}
                >
                  Register
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="gradient"
                  gradient={{ from: '#667eea', to: '#764ba2' }}
                  className="hover-lift"
                  style={{ borderRadius: '12px' }}
                >
                  Login
                </Button>
              </Link>
            </>
          )}
        </Group>
      </header>

      <main>{children}</main>
    </>
  );
}