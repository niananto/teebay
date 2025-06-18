import { Card, Title, Text, Divider, Group } from '@mantine/core';
import './ProductCard.css';

interface Category {
  id: number;
  name: string;
}

interface ProductCardProps {
  name: string;
  categories: Category[];
  price: number;
  rent: number;
  rentType: string;
  description: string;
  created: string;
}

export default function ProductCard({ name, categories, price, rent, rentType, description, created }: ProductCardProps) {

  const formattedDate = new Date(created).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="product-card">
      <Title order={4} className="product-name">{name}</Title>

      <Text size="sm" color="dimmed" className="category-line">
        Categories:{" "}
        {categories.map((cat, idx) => (
          <Text component="span" color="blue" inherit key={cat.id}>
            {cat.name}
            {idx < categories.length - 1 ? ", " : ""}
          </Text>
        ))}
      </Text>

      <Text size="sm" className="price-line">
        Price: <span className="price">${price}</span> | Rent:{" "}
        <span className="rent">
          {rentType === 'daily' ? `$${rent}/day` : `$${rent}/hour`}
        </span>
      </Text>

      <Text size="sm" className="description">
        {description.length > 200 ? description.slice(0, 200) + '...' : description}
      </Text>

      <Divider my="sm" />

      <Group justify="space-between" gap="xs">
        <Text size="xs" color="gray">Date posted: {formattedDate}</Text>
      </Group>
    </Card>
  );
}
