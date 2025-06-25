import { Modal, Text, Button, Group, TextInput, Stack, ThemeIcon } from '@mantine/core';
import { IconCalendarEvent } from '@tabler/icons-react';
import { useState } from 'react';

interface RentProductModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (from: Date, to: Date) => void;
}

export default function RentProductModal({
  opened,
  onClose,
  onConfirm,
}: RentProductModalProps) {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (!from || !to) {
      setError('Please select both dates');
    } else if (toDate <= fromDate) {
      setError('"To" date must be after "From" date');
    } else {
      setError(null);
      onConfirm(fromDate, toDate);
    }
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={
        <Group gap="sm">
          <ThemeIcon
            size={32}
            radius="xl"
            variant="light"
            style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}
          >
            <IconCalendarEvent size={18} />
          </ThemeIcon>
          <Text fw={600} size="lg">Select Rental Period</Text>
        </Group>
      }
      centered
      radius="xl"
      styles={{
        content: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }
      }}
    >
      <Stack gap="md" p="sm">
        <div>
          <Text size="sm" fw={500} mb="xs" style={{ color: '#374151' }}>From Date</Text>
          <TextInput
            type="date"
            value={from}
            onChange={(e) => setFrom(e.currentTarget.value)}
            min={new Date().toISOString().split('T')[0]}
            styles={{
              input: {
                borderRadius: '12px',
                border: '2px solid rgba(102, 126, 234, 0.1)',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }
            }}
          />
        </div>

        <div>
          <Text size="sm" fw={500} mb="xs" style={{ color: '#374151' }}>To Date</Text>
          <TextInput
            type="date"
            value={to}
            onChange={(e) => setTo(e.currentTarget.value)}
            min={from || new Date().toISOString().split('T')[0]}
            styles={{
              input: {
                borderRadius: '12px',
                border: '2px solid rgba(102, 126, 234, 0.1)',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }
            }}
          />
        </div>

        {error && (
          <Text size="sm" c="red" ta="center" p="sm" style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '8px'
          }}>
            {error}
          </Text>
        )}

        <Group justify="center" mt="lg" gap="md">
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
            gradient={{ from: '#667eea', to: '#764ba2' }}
            onClick={handleConfirm}
            style={{ borderRadius: '12px' }}
          >
            Confirm Rental
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}