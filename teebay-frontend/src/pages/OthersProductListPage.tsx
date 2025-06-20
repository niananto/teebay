import { useState } from 'react';
import { useOthersProductList } from '../hooks/useOthersProductList';
import {
  Container,
  Title,
  Button,
  Text,
  Stack,
  Group,
} from '@mantine/core';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import '../styles/ProductListPage.css';
import { useAuth } from '../auth/AuthContext';

export default function OthersProductListPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { products, loading, error } = useOthersProductList({ ownerId: user?.id || -1, page, limit });

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <Container size="lg" className="product-container">
      <Title order={2} className="title">BROWSE PRODUCTS</Title>

      <Stack gap="lg">
        {products.map((p: any) => (
          <Link to={`/products/${p.id}`} className="card-link" key={p.id}>
            <ProductCard
              name={p.name}
              categories={p.categories}
              price={p.price}
              rent={p.rent}
              rentType={p.rent_type}
              description={p.description}
              created={p.created}
              ownerId={p.owner_id}
            />
          </Link>
        ))}
      </Stack>

      <Group justify="center" mt="lg">
        <Button onClick={handlePrev} disabled={page === 1}>
          Previous
        </Button>
        <Text>Page {page}</Text>
        <Button onClick={handleNext} disabled={products.length < limit}>
          Next
        </Button>
      </Group>
    </Container>
  );
}
