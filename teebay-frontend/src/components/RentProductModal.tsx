import { Modal, Text, Button, Group, TextInput } from '@mantine/core';
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
  const [from, setFrom] = useState<string>(''); // ISO format: YYYY-MM-DD
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
    <Modal opened={opened} onClose={onClose} title="Rental period" centered>
      <Text size="sm" mb="xs">From</Text>
      <TextInput
        type="date"
        value={from}
        onChange={(e) => setFrom(e.currentTarget.value)}
        mb="sm"
        min={new Date().toISOString().split('T')[0]}
      />

      <Text size="sm" mb="xs">To</Text>
      <TextInput
        type="date"
        value={to}
        onChange={(e) => setTo(e.currentTarget.value)}
        min={from || new Date().toISOString().split('T')[0]}
      />

      {error && (
        <Text size="xs" color="red" mt="sm">
          {error}
        </Text>
      )}

      <Group justify="center" mt="md">
        <Button color="red" onClick={onClose}>Go Back</Button>
        <Button color="blue" onClick={handleConfirm}>
          Confirm rent
        </Button>
      </Group>
    </Modal>
  );
}
