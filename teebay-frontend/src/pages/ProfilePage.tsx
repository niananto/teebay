// src/pages/ProfilePage.tsx
import { Container, Title, Text, Stack, LoadingOverlay, Avatar, Group, Divider } from '@mantine/core';
import { useProfileDetails } from '../hooks/useProfileDetails';
import { useAuth } from '../auth/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const { user: userDetails, loading, error } = useProfileDetails(user?.id || -1);

  if (loading) return <LoadingOverlay visible />;
  if (error || !userDetails) return <Text c="red">Failed to load user profile</Text>;

  return (
    <Container size="sm" pt="lg">
      <Title order={2} mb="md">My Profile</Title>

      <Group align="flex-start" mb="lg" gap="xl">
        <Avatar src="/default-avatar.png" size={96} radius="xl" alt="Profile picture" />
        <Stack gap={5}>
          <Text size="xl" fw={500}>
            {userDetails.first_name} {userDetails.last_name}
          </Text>
          <Text size="sm" c="dimmed">
            @{userDetails.username}
          </Text>
        </Stack>
      </Group>

      <Divider mb="sm" />

      <Stack gap="xs">
        <Text><strong>Email:</strong> {userDetails.email}</Text>
        <Text><strong>Phone:</strong> {userDetails.phone}</Text>
        <Text><strong>Address:</strong> {userDetails.address}</Text>
      </Stack>
    </Container>
  );
}
