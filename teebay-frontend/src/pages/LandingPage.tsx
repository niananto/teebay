import { Link } from 'react-router-dom';
import { Container, Title, Text, Button, Group, Stack, Card, SimpleGrid } from '@mantine/core';
import { IconShoppingBag, IconSearch, IconTrendingUp, IconShield } from '@tabler/icons-react';

export default function LandingPage() {
  return (
    <Container size="lg" py="xl">
      <div className="fade-in">
        {/* Hero Section */}
        <Stack align="center" gap="xl" mb="xl" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <Title 
            order={1} 
            size="3.5rem" 
            className="gradient-text"
            style={{ 
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}
          >
            Welcome to TeeBay
          </Title>
          <Text 
            size="xl" 
            c="dimmed" 
            maw={600} 
            style={{ 
              lineHeight: 1.6,
              fontSize: '1.25rem'
            }}
          >
            Your premium marketplace for buying, selling, and renting products. 
            Experience seamless transactions with our modern platform.
          </Text>
          
          <Group gap="lg" mt="xl">
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button 
                size="lg" 
                variant="gradient"
                gradient={{ from: '#667eea', to: '#764ba2' }}
                className="hover-lift"
                style={{ 
                  borderRadius: '16px',
                  padding: '12px 32px',
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                Get Started
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button 
                size="lg" 
                variant="outline"
                className="hover-lift"
                style={{ 
                  borderRadius: '16px',
                  padding: '12px 32px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderColor: '#667eea',
                  color: '#667eea'
                }}
              >
                Sign In
              </Button>
            </Link>
          </Group>
        </Stack>

        {/* Features Section */}
        <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="xl" mt="4rem">
          <Card className="glass-card hover-lift" p="xl" radius="xl">
            <Stack align="center" gap="md">
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '16px',
                padding: '16px',
                color: 'white'
              }}>
                <IconShoppingBag size={32} />
              </div>
              <Title order={4} className="gradient-text">Buy & Sell</Title>
              <Text size="sm" c="dimmed" ta="center">
                Discover amazing products or list your own items for sale with ease.
              </Text>
            </Stack>
          </Card>

          <Card className="glass-card hover-lift" p="xl" radius="xl">
            <Stack align="center" gap="md">
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '16px',
                padding: '16px',
                color: 'white'
              }}>
                <IconSearch size={32} />
              </div>
              <Title order={4} className="gradient-text">Smart Search</Title>
              <Text size="sm" c="dimmed" ta="center">
                Find exactly what you need with our advanced search and filtering system.
              </Text>
            </Stack>
          </Card>

          <Card className="glass-card hover-lift" p="xl" radius="xl">
            <Stack align="center" gap="md">
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '16px',
                padding: '16px',
                color: 'white'
              }}>
                <IconTrendingUp size={32} />
              </div>
              <Title order={4} className="gradient-text">Rental Options</Title>
              <Text size="sm" c="dimmed" ta="center">
                Rent products for short-term use instead of buying. Perfect for occasional needs.
              </Text>
            </Stack>
          </Card>

          <Card className="glass-card hover-lift" p="xl" radius="xl">
            <Stack align="center" gap="md">
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '16px',
                padding: '16px',
                color: 'white'
              }}>
                <IconShield size={32} />
              </div>
              <Title order={4} className="gradient-text">Secure Platform</Title>
              <Text size="sm" c="dimmed" ta="center">
                Your transactions are protected with our secure payment and verification system.
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>

        {/* CTA Section */}
        <Card className="glass-card" p="4rem" radius="xl" mt="4rem">
          <Stack align="center" gap="xl">
            <Title order={2} className="gradient-text" ta="center">
              Ready to Start Trading?
            </Title>
            <Text size="lg" c="dimmed" ta="center" maw={500}>
              Join thousands of users who trust TeeBay for their buying, selling, and renting needs.
            </Text>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button 
                size="xl" 
                variant="gradient"
                gradient={{ from: '#667eea', to: '#764ba2' }}
                className="hover-lift"
                style={{ 
                  borderRadius: '20px',
                  padding: '16px 48px',
                  fontSize: '1.2rem',
                  fontWeight: 700
                }}
              >
                Join TeeBay Today
              </Button>
            </Link>
          </Stack>
        </Card>
      </div>
    </Container>
  );
}