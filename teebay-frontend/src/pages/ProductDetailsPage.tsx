import ProductDetails from '../components/ProductDetails';
import { Button, Group } from '@mantine/core';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductDetails } from '../hooks/useProductDetails';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  
  const { product, loading, error } = useProductDetails(Number(id));

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProduct, { loading: deleting }] = useMutation(DELETE_PRODUCT);
  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct({ variables: { id: Number(id) } });

      // Optional: show success message or toast here
      // Refetch product list or remove from local state if you're caching manually
      // For now, a simple window reload or refetchProducts() can work:
      // window.location.reload(); // or trigger useProductList() to refetch
      navigate('/products'); // Redirect to product list after deletion

      setDeleteModalOpen(false);
    } catch (err) {
      console.error('Failed to delete product:', err);
      // Optionally show an error toast
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div>Failed to load product</div>;

  return (
    <>
      <ProductDetails {...product} />
      <DeleteConfirmationModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <Group gap="lg" mt="md">
        <Button mt="md" color="red" onClick={() => setDeleteModalOpen(true)}>
          Delete Product
        </Button>
        <Link to={`/products/${id}/edit`}>
          <Button mt="md" variant="outline" color="blue">
            Edit Product
          </Button>
        </Link>
      </Group>
    </>
  );
}
