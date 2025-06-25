import { useState } from 'react';
import { useOwnedProductList } from '../hooks/useOwnedProductList';
import { Container, Title, Button, Text, Stack, Group } from '@mantine/core';
import ProductCard from '../components/ProductCard';
import ConfirmationModal from '../components/ConfirmationModal';
import { Link } from 'react-router-dom';
import '../styles/ProductListPage.css';
import { IconTrash, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
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

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleConfirmDelete = async () => {
    if (selectedProductId == null) return;

    try {
      await deleteProduct({ variables: { id: selectedProductId } });
      window.location.reload();
      setDeleteModalOpen(false);
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  if (loading) return (
    <Container size="lg" className="product-container">
      <div className="empty-state">
        <Text className="empty-state-title">Loading your products...</Text>
      </div>
    </Container>
  );

  if (error) return (
    <Container size="lg" className="product-container">
      <div className="empty-state">
        <Text className="empty-state-title">Something went wrong</Text>
        <Text className="empty-state-text">Please try refreshing the page</Text>
      </div>
    </Container>
  );

  return (
    <Container size="lg" className="product-container">
      <Title order={1} className="title slide-in">MY PRODUCTS</Title>

      {products.length === 0 ? (
        <div className="empty-state fade-in">
          <Text className="empty-state-title">No products yet</Text>
          <Text className="empty-state-text">Start by adding your first product to the marketplace</Text>
          <Link to="/products/add" style={{ textDecoration: 'none', marginTop: '2rem', display: 'inline-block' }}>
            <Button 
              variant="gradient"
              gradient={{ from: '#667eea', to: '#764ba2' }}
              size="lg"
              style={{ borderRadius: '12px' }}
            >
              Add Your First Product
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <Stack gap="xl" className="fade-in">
            {products.map((p: any, index: number) => (
              <div 
                className="product-wrapper slide-in" 
                key={p.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="delete-icon" onClick={() => openDeleteModal(p.id)}>
                  <IconTrash size={20} color="#ef4444" />
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

          <div className="pagination-container">
            <Button 
              onClick={handlePrev} 
              disabled={page === 1}
              leftSection={<IconChevronLeft size={18} />}
              variant="outline"
              className="pagination-button"
            >
              Previous
            </Button>
            <div className="page-indicator">
              Page {page}
            </div>
            <Button 
              onClick={handleNext} 
              disabled={products.length < limit}
              rightSection={<IconChevronRight size={18} />}
              variant="outline"
              className="pagination-button"
            >
              Next
            </Button>
          </div>
        </>
      )}

      <ConfirmationModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </Container>
  );
}