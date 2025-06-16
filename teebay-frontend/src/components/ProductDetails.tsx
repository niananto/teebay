import { Card, Text, Title, Stack } from '@mantine/core';

interface ProductDetailsProps {
  name: string;
  categories: string[];
  price: number;
  mode: string;
  description: string;
}

export default function ProductDetails(product: ProductDetailsProps) {

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="xs">
        <Title order={3}>{product.name}</Title>
        <Text size="sm" c="dimmed">
          Categories: {product.categories?.join(', ')}
        </Text>
        <Text size="sm" c="blue">
          Price: ${product.price} {product.mode}
        </Text>
        <Text size="sm">{product.description}</Text>
      </Stack>
    </Card>
  );
}
