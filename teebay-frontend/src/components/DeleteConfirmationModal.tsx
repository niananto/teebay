import { Modal, Button, Text, Group } from '@mantine/core';

interface DeleteConfirmationProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({ opened, onClose, onConfirm }: DeleteConfirmationProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    >
      <Text size="md" mb="md">
        Are you sure you want to delete this product?
      </Text>
      <Group justify="center">
        <Button variant="outline" color="red" onClick={onClose}>
          No
        </Button>
        <Button color="violet" onClick={onConfirm}>
          Yes
        </Button>
      </Group>
    </Modal>
  );
}
