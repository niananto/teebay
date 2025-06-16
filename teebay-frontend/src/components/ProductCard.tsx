import { Card, Title, Text, Divider, Group } from '@mantine/core';
import './ProductCard.css';

interface ProductCardProps {
  name: string;
  categories: string[];
  price: number;
  rent: number;
  rentType: 'daily' | 'hourly';
  description: string;
  createdAt: string;
  views: number;
}

export default function ProductCard({
  name,
  categories,
  price,
  rent,
  rentType,
  description,
  createdAt,
  views,
}: ProductCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="product-card">
      <Title order={4} className="product-name">{name}</Title>

      <Text size="sm" color="dimmed" className="category-line">
        Categories:{" "}
        {(categories ?? []).map((cat, idx) => (
          <Text component="span" color="blue" inherit key={idx}>
            {cat}
            {idx < (categories.length - 1) ? ", " : ""}
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
        <Text size="xs" color="gray">Date posted: {new Date(createdAt).toLocaleDateString()}</Text>
        <Text size="xs" color="gray">{views} views</Text>
      </Group>
    </Card>
  );
}
