import { Modal, Button, Text, Group, Stack, ThemeIcon } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

interface ConfirmationProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

export default function ConfirmationModal({ opened, onClose, onConfirm, message }: ConfirmationProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.7, blur: 8 }}
      radius="xl"
      styles={{
        content: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }
      }}
    >
      <Stack align="center" gap="lg" p="md">
        <ThemeIcon
          size={60}
          radius="xl"
          variant="light"
          color="red"
          style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}
        >
          <IconAlertTriangle size={30} />
        </ThemeIcon>
        
        <Text size="lg" fw={600} ta="center" style={{ color: '#374151' }}>
          {message || 'Are you sure?'}
        </Text>
        
        <Group gap="md" mt="md">
          <Button 
            variant="outline" 
            color="gray" 
            onClick={onClose}
            style={{ 
              borderRadius: '12px',
              borderColor: '#d1d5db',
              color: '#6b7280'
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="gradient"
            gradient={{ from: '#ef4444', to: '#dc2626' }}
            onClick={onConfirm}
            style={{ borderRadius: '12px' }}
          >
            Confirm
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}