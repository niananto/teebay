import {
  Button,
  Group,
  Container,
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
  const [deleteProduct, { loading: deleting }] = useMutation(DELETE_PRODUCT);

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



  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div>Failed to load product</div>;

  const isOwner = user?.id === product.owner_id;

  return (
    <Container size="md" pt="md">
      <ProductDetails {...product} />

      <Group justify="center" mb="sm">
        {isOwner ? (
          <>
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
          </>
        ) : (
          <>
            <Button
              size="xs"
              color="teal"
              leftSection={<IconShoppingCart size={14} />}
              onClick={() => setBuyModalOpen(true)}
              loading={buying}
            >
              Buy Now
            </Button>
            <Button
              size="xs"
              color="grape"
              variant="outline"
              leftSection={<IconCalendarEvent size={14} />}
              onClick={() => setRentModalOpen(true)}
              loading={renting}
            >
              Rent Product
            </Button>
          </>
        )}
      </Group>

      <ConfirmationModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product?"
      />

      <ConfirmationModal
        opened={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        onConfirm={handleBuy}
        message="Are you sure you want to buy this product?"
      />

      <RentProductModal
        opened={rentModalOpen}
        onClose={() => setRentModalOpen(false)}
        onConfirm={handleRent}
      />

    </Container>
  );
}
