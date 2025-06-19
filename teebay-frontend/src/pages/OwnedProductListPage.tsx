import { useState } from 'react';
import { useOwnedProductList } from '../hooks/useOwnedProductList';
import { Container, Title, Button, Text, Stack, Group } from '@mantine/core';
import ProductCard from '../components/ProductCard';
import ConfirmationModal from '../components/ConfirmationModal';
import { Link } from 'react-router-dom';
import '../styles/ProductListPage.css';
import { IconTrash } from '@tabler/icons-react';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../auth/AuthContext';

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;

export default function OwnedProductListPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { products, loading, error } = useOwnedProductList({ ownerId: user?.id || -1, page, limit });

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const openDeleteModal = (productId: number) => {
    setSelectedProductId(productId);
    setDeleteModalOpen(true);
  };

  const [deleteProduct, { loading: deleting }] = useMutation(DELETE_PRODUCT);

  const handleConfirmDelete = async () => {
    if (selectedProductId == null) return;

    try {
      await deleteProduct({ variables: { id: selectedProductId } });

      // Optional: show success message or toast here
      // Refetch product list or remove from local state if you're caching manually
      // For now, a simple window reload or refetchProducts() can work:
      window.location.reload(); // or trigger useProductList() to refetch

      setDeleteModalOpen(false);
    } catch (err) {
      console.error('Failed to delete product:', err);
      // Optionally show an error toast
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <Container size="lg" className="product-container">
      <Title order={2} className="title">MY PRODUCTS</Title>

      <Stack gap="lg">
        {products.map((p: any) => (
          <div className="product-wrapper" key={p.id}>
            <div className="delete-icon" onClick={() => openDeleteModal(p.id)}>
              <IconTrash size={18} color="red" />
            </div>

            <Link to={`/products/${p.id}`} className="card-link">
              <ProductCard
                name={p.name}
                categories={p.categories}
                price={p.price}
                rent={p.rent}
                rentType={p.rent_type}
                description={p.description}
                created={p.created}
              />
            </Link>
          </div>
        ))}
      </Stack>

      <ConfirmationModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product?"
      />

      <Group justify="center" mt="lg">
        <Button onClick={handlePrev} disabled={page === 1}>Previous</Button>
        <Text>Page {page}</Text>
        <Button onClick={handleNext} disabled={products.length < limit}>Next</Button>
      </Group>
    </Container>
  );
}
