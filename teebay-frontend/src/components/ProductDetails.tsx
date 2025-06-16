import { Card, Text, Title, Stack, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

interface ProductDetailsProps {
  id: string;
  name: string;
  categories: string[];
  price: number;
  description: string;
  buttonType: string;
}

export default function ProductDetails(product: ProductDetailsProps) {

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="xs">
          <Title order={3}>{product.name}</Title>
          <Text size="sm" c="dimmed">
            Categories: {product.categories?.join(', ')}
          </Text>
          <Text size="sm" c="blue">
            Price: ${product.price}
          </Text>
          <Text size="sm">{product.description}</Text>
        </Stack>
      </Card>
      {product.buttonType === 'edit' && (
        <Link to={`/products/${product.id}/edit`}>
          <Button mt="md" variant="outline" color="blue">
            Edit Product
          </Button>
        </Link>
      )}
    </>
  );
}
