import {
  Button,
  Group,
  Container,
  Title,
} from '@mantine/core';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductDetails } from '../hooks/useProductDetails';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import ProductDetails from '../components/ProductDetails';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { IconTrash, IconPencil } from '@tabler/icons-react';

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { product, loading, error } = useProductDetails(productId);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [deleteProduct, { loading: deleting }] = useMutation(DELETE_PRODUCT);
  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct({ variables: { id: productId } });
      setDeleteModalOpen(false);
      navigate('/products');
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div>Failed to load product</div>;

  return (
    <Container size="md" pt="md">

      <ProductDetails {...product} />

      <Group justify="center" mb="sm">
        <Button
          size="xs"
          color="red"
          variant="light"
          leftSection={<IconTrash size={14} />}
          onClick={() => setDeleteModalOpen(true)}
        >
          Delete
        </Button>
        <Link to={`/products/${id}/edit`}>
          <Button
            size="xs"
            variant="light"
            color="blue"
            leftSection={<IconPencil size={14} />}
          >
            Edit
          </Button>
        </Link>
      </Group>

      <DeleteConfirmationModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
}
