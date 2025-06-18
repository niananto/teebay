import { Card, Title, Text, Divider, Group } from '@mantine/core';
import './ProductCard.css';
import { formatDate } from '../utils/utils';

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
          {(() => {
            switch (rentType?.toLowerCase()) {
              case 'hourly':
                return `$${rent}/hour`;
              case 'daily':
                return `$${rent}/day`;
              case 'weekly':
                return `$${rent}/week`;
              case 'monthly':
                return `$${rent}/month`;
              default:
                return `$${rent}`;
            }
          })()}
        </span>
      </Text>

      <Text size="sm" className="description">
        {description.length > 200 ? description.slice(0, 200) + '...' : description}
      </Text>

      <Divider my="sm" />

      <Group justify="space-between" gap="xs">
        <Text size="xs" color="gray">Date posted: {formatDate(created)}</Text>
      </Group>
    </Card>
  );
}
