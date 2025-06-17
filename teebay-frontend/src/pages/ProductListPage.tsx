import React, { useState } from 'react';
import { useProductList } from '../hooks/useProductList';
import {
  Container,
  Title,
  Button,
  Text,
  Stack,
} from '@mantine/core';
import ProductCard from '../components/ProductCard';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ProductListPage() {
  const { logout } = useAuth();

  const [page, setPage] = useState(1);
  const limit = 5;

  const { products, loading, error } = useProductList({ page, limit });

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const openDeleteModal = (productId: number) => {
    setSelectedProductId(productId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Delete product ${selectedProductId}`);
    setDeleteModalOpen(false);
    // will be triggerring mutation here
  };

  return (
    <Container size="lg" className="product-container">
      <div className="header">
        <Button color="red" size="xs" onClick={logout}>
          Logout
        </Button>
      </div>

      <Title order={2} className="title">MY PRODUCTS</Title>

      <Stack gap="lg">
        {products.map((p: any) => (
          <React.Fragment key={p.id}>
            <ProductCard
              name={p.name}
              categories={p.categories}
              price={p.price}
              rent={p.rent}
              rentType={p.rent_type}
              description={p.description}
              createdAt={p.createdAt}
              views={p.views}
            />
            <Link to={`/products/${p.id}`}>
              <Button color="blue" size="xs">View Product</Button>
            </Link>
            <Button color="red" size="xs" onClick={() => openDeleteModal(p.id)}>
              Delete Product
            </Button>
          </React.Fragment>
        ))}
      </Stack>

      <DeleteConfirmationModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <div className="pagination">
        <Button onClick={handlePrev} disabled={page === 1}>Previous</Button>
        <Text>Page {page}</Text>
        <Button onClick={handleNext} disabled={products.length < limit}>Next</Button>
      </div>

      <div className="footer">
        <Link to="/products/add">
          <Button color="green">Add New Product</Button>
        </Link>
      </div>
    </Container>
  );
}
