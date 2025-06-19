import { Modal, Button, Text, Group } from '@mantine/core';

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
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      <Text size="md" mb="md">
        {message || 'Are you sure?'}
      </Text>
      <Group justify="center">
        <Button variant="outline" color="red" onClick={onClose}>
          No
        </Button>
        <Button color="blue" onClick={onConfirm}>
          Yes
        </Button>
      </Group>
    </Modal>
  );
}
