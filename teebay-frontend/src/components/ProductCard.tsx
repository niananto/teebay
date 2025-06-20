import { Card, Title, Text, Divider, Group, Stack, Image, Flex } from '@mantine/core';
import './ProductCard.css';
import { formatDate } from '../utils/utils';
import { useProfileDetails } from '../hooks/useProfileDetails';

interface Category {
  id: number;
  name: string;
}

interface ProductCardProps {
  name: string;
  categories: Category[];
  ownerId?: number;
  price: number;
  rent: number;
  rentType: string;
  description: string;
  created: string;
  thumbnailUrl?: string;
}

export default function ProductCard({ name, categories, ownerId, price, rent, rentType, description, created, thumbnailUrl = 'https://picsum.photos/200' }: ProductCardProps) {
  const handleFetchProfile = (ownerId: number) => {
    return useProfileDetails(ownerId);
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="product-card">
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ flex: '0 0 100px' }}>
          <Image
            src={thumbnailUrl}
            alt="Product"
            width={100}
            height={100}
            radius="md"
            fit="cover"
            style={{ objectFit: 'cover', display: 'block' }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <Title order={4} className="product-name" style={{ marginBottom: 6 }}>{name}</Title>

          <Text size="sm" color="dimmed" className="category-line" style={{ marginBottom: 6 }}>
            Categories:{" "}
            {categories.map((cat, idx) => (
              <Text component="span" color="blue" inherit key={cat.id}>
                {cat.name}
                {idx < categories.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>

          <Text size="sm" className="price-line" style={{ marginBottom: 6 }}>
            Price: <span className="price">${price}</span> | Rent:{" "}
            <span className="rent">
              {(() => {
                switch (rentType?.toLowerCase()) {
                  case 'hourly': return `$${rent}/hour`;
                  case 'daily': return `$${rent}/day`;
                  case 'weekly': return `$${rent}/week`;
                  case 'monthly': return `$${rent}/month`;
                  default: return `$${rent}`;
                }
              })()}
            </span>
          </Text>

          <Text size="sm" className="description">
            {description.length > 200 ? description.slice(0, 200) + '...' : description}
          </Text>
        </div>
      </div>

      <Divider my="sm" />

      <Group justify="space-between" gap="xs">
        <Text size="xs" color="gray">Date posted: {formatDate(created)}</Text>
        <Text size="xs" color="gray" className="owner-id">
          {ownerId ? `Owned by: ${handleFetchProfile(ownerId).user?.username || 'Unknown'}` : ''}
        </Text>
      </Group>
    </Card>

  );
}
