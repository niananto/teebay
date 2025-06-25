import {
  Button,
  Group,
  Container,
  Card,
  Stack,
} from '@mantine/core';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductDetails } from '../hooks/useProductDetails';
import ConfirmationModal from '../components/ConfirmationModal';
import RentProductModal from '../components/RentProductModal';
import ProductDetails from '../components/ProductDetails';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { IconTrash, IconPencil, IconShoppingCart, IconCalendarEvent } from '@tabler/icons-react';
import { useAuth } from '../auth/AuthContext';

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;

const BUY_PRODUCT = gql`
  mutation Buy($productId: Int!, $receiverId: Int!) {
    buy(buyInput: { product_id: $productId, receiver_id: $receiverId }) {
      id
      trx_id
    }
  }
`;

const RENT_PRODUCT = gql`
  mutation Rent($productId: Int!, $receiverId: Int!, $rentStart: DateTime!, $rentEnd: DateTime!) {
    rent(
      rentInput: {
        product_id: $productId
        receiver_id: $receiverId
        rent_start: $rentStart
        rent_end: $rentEnd
      }
    ) {
      id
      trx_id
    }
  }
`;

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  const { product, loading, error, refetch } = useProductDetails(productId);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProduct ] = useMutation(DELETE_PRODUCT);

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct({ variables: { id: productId } });
      setDeleteModalOpen(false);
      navigate('/products');
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [rentModalOpen, setRentModalOpen] = useState(false);
  const [buyProduct, { loading: buying }] = useMutation(BUY_PRODUCT);
  const [rentProduct, { loading: renting }] = useMutation(RENT_PRODUCT);

  const handleBuy = async () => {
    try {
      await buyProduct({
        variables: {
          productId,
          receiverId: user?.id,
        },
      });
      await refetch();
      setBuyModalOpen(false);
    } catch (err) {
      console.error("Buy failed:", err);
    }
  };

  const handleRent = async (from: Date, to: Date) => {
    try {
      await rentProduct({
        variables: {
          productId,
          receiverId: user?.id,
          rentStart: from.toISOString(),
          rentEnd: to.toISOString(),
        },
      });
      setRentModalOpen(false);
    } catch (err) {
      console.error("Rent failed:", err);
    }
  };

  if (loading) return (
    <Container size="md" pt="md">
      <Card className="glass-card" p="xl" radius="xl">
        <div className="empty-state">
          <div className="empty-state-title">Loading product details...</div>
        </div>
      </Card>
    </Container>
  );

  if (error || !product) return (
    <Container size="md" pt="md">
      <Card className="glass-card" p="xl" radius="xl">
        <div className="empty-state">
          <div className="empty-state-title">Failed to load product</div>
          <div className="empty-state-text">Please try refreshing the page</div>
        </div>
      </Card>
    </Container>
  );

  const isOwner = user?.id === product.owner_id;

  return (
    <Container size="md" py="xl">
      <Card className="glass-card hover-lift" p="2rem" radius="xl">
        <Stack gap="xl">
          <ProductDetails {...product} />

          <Group justify="center" gap="md">
            {isOwner ? (
              <>
                <Button
                  size="md"
                  color="red"
                  variant="light"
                  leftSection={<IconTrash size={18} />}
                  onClick={() => setDeleteModalOpen(true)}
                  className="hover-lift"
                  style={{ borderRadius: '12px' }}
                >
                  Delete Product
                </Button>
                <Link to={`/products/${id}/edit`} style={{ textDecoration: 'none' }}>
                  <Button
                    size="md"
                    variant="gradient"
                    gradient={{ from: '#667eea', to: '#764ba2' }}
                    leftSection={<IconPencil size={18} />}
                    className="hover-lift"
                    style={{ borderRadius: '12px' }}
                  >
                    Edit Product
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  variant="gradient"
                  gradient={{ from: '#10b981', to: '#059669' }}
                  leftSection={<IconShoppingCart size={20} />}
                  onClick={() => setBuyModalOpen(true)}
                  loading={buying}
                  className="hover-lift"
                  style={{ 
                    borderRadius: '12px',
                    padding: '12px 24px',
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}
                >
                  Buy Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="grape"
                  leftSection={<IconCalendarEvent size={20} />}
                  onClick={() => setRentModalOpen(true)}
                  loading={renting}
                  className="hover-lift"
                  style={{ 
                    borderRadius: '12px',
                    padding: '12px 24px',
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}
                >
                  Rent Product
                </Button>
              </>
            )}
          </Group>
        </Stack>
      </Card>

      <ConfirmationModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product? This action cannot be undone."
      />

      <ConfirmationModal
        opened={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        onConfirm={handleBuy}
        message="Are you sure you want to purchase this product?"
      />

      <RentProductModal
        opened={rentModalOpen}
        onClose={() => setRentModalOpen(false)}
        onConfirm={handleRent}
      />
    </Container>
  );
}