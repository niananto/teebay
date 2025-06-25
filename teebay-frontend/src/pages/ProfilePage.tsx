import { Container, Title, Text, Stack, LoadingOverlay, Avatar, Group, Divider, Card, Badge } from '@mantine/core';
import { useProfileDetails } from '../hooks/useProfileDetails';
import { useAuth } from '../auth/AuthContext';
import { IconUser, IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { user: userDetails, loading, error } = useProfileDetails(user?.id || -1);

  if (loading) return <LoadingOverlay visible />;
  if (error || !userDetails) return (
    <Container size="sm" pt="lg">
      <Card className="glass-card" p="xl" radius="xl">
        <Text c="red" ta="center">Failed to load user profile</Text>
      </Card>
    </Container>
  );

  return (
    <Container size="sm" py="xl">
      <Card className="glass-card hover-lift" p="3rem" radius="xl">
        <Stack gap="xl">
          <div style={{ textAlign: 'center' }}>
            <Title order={2} className="gradient-text" mb="lg">My Profile</Title>
            
            <Avatar 
              src="/default-avatar.png" 
              size={120} 
              radius="xl" 
              alt="Profile picture"
              style={{
                margin: '0 auto',
                border: '4px solid rgba(102, 126, 234, 0.2)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)'
              }}
            />
            
            <Title order={3} mt="lg" mb="xs" style={{ color: '#374151' }}>
              {userDetails.first_name} {userDetails.last_name}
            </Title>
            
            <Badge 
              size="lg" 
              variant="light"
              style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                color: '#667eea',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}
            >
              @{userDetails.username}
            </Badge>
          </div>

          <Divider />

          <Stack gap="lg">
            <Group gap="md">
              <div style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <IconMail size={20} color="#667eea" />
              </div>
              <div>
                <Text size="sm" c="dimmed" fw={500}>Email Address</Text>
                <Text fw={600}>{userDetails.email}</Text>
              </div>
            </Group>

            <Group gap="md">
              <div style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <IconPhone size={20} color="#667eea" />
              </div>
              <div>
                <Text size="sm" c="dimmed" fw={500}>Phone Number</Text>
                <Text fw={600}>{userDetails.phone}</Text>
              </div>
            </Group>

            <Group gap="md">
              <div style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <IconMapPin size={20} color="#667eea" />
              </div>
              <div>
                <Text size="sm" c="dimmed" fw={500}>Address</Text>
                <Text fw={600}>{userDetails.address || 'Not provided'}</Text>
              </div>
            </Group>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}