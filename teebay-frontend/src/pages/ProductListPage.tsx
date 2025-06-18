import { useState } from 'react';
import { useProductList } from '../hooks/useProductList';
import { Container, Title, Button, Text, Stack, Group } from '@mantine/core';
import ProductCard from '../components/ProductCard';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { Link } from 'react-router-dom';
import '../styles/ProductListPage.css';
import { IconTrash } from '@tabler/icons-react';

export default function ProductListPage() {
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
                createdAt={p.createdAt}
                views={p.views}
              />
            </Link>
          </div>
        ))}
      </Stack>

      <DeleteConfirmationModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <Group justify="center" mt="lg">
        <Button onClick={handlePrev} disabled={page === 1}>Previous</Button>
        <Text>Page {page}</Text>
        <Button onClick={handleNext} disabled={products.length < limit}>Next</Button>
      </Group>
    </Container>
  );
}
