import { useState } from 'react';
import { useProductList } from '../hooks/useProductList';
import {
  Container,
  Title,
  Button,
  Text,
  Stack,
} from '@mantine/core';
import ProductCard from '../components/ProductCard';

export default function ProductListPage() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { products, loading, error } = useProductList({ page, limit });

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <Container size="lg" className="product-container">
      <div className="header">
        <Button color="red" size="xs">LOGOUT</Button>
      </div>

      <Title order={2} className="title">MY PRODUCTS</Title>

      <Stack gap="lg">
        {products.map((p: any) => (
          <ProductCard
            key={p.id}
            name={p.name}
            categories={p.categories}
            price={p.price}
            rent={p.rent}
            rentType={p.rent_type}
            description={p.description}
            createdAt={p.createdAt}
            views={p.views}
          />
        ))}
      </Stack>

      <div className="pagination">
        <Button onClick={handlePrev} disabled={page === 1}>Previous</Button>
        <Text>Page {page}</Text>
        <Button onClick={handleNext} disabled={products.length < limit}>Next</Button>
      </div>

      <div className="footer">
        <Button color="violet">Add Product</Button>
      </div>
    </Container>
  );
}
