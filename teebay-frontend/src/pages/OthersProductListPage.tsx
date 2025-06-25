import { useState } from 'react';
import { useOthersProductList } from '../hooks/useOthersProductList';
import {
  Container,
  Title,
  Button,
  Text,
  Stack,
} from '@mantine/core';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import '../styles/ProductListPage.css';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useAuth } from '../auth/AuthContext';

export default function OthersProductListPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { products, loading, error } = useOthersProductList({ ownerId: user?.id || -1, page, limit });

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  if (loading) return (
    <Container size="lg" className="product-container">
      <div className="empty-state">
        <Text className="empty-state-title">Discovering amazing products...</Text>
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
      <Title order={1} className="title slide-in">BROWSE PRODUCTS</Title>

      {products.length === 0 ? (
        <div className="empty-state fade-in">
          <Text className="empty-state-title">No products available</Text>
          <Text className="empty-state-text">Check back later for new listings</Text>
        </div>
      ) : (
        <>
          <Stack gap="xl" className="fade-in">
            {products.map((p: any, index: number) => (
              <Link 
                to={`/products/${p.id}`} 
                className="card-link slide-in" 
                key={p.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
    </Container>
  );
}