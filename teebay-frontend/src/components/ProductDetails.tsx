import { Card, Text, Title, Stack, Divider, Group } from '@mantine/core';
import { formatDate } from '../utils/utils';

interface Category {
  id: number;
  name: string;
}

interface ProductDetailsProps {
  name: string;
  categories: Category[];
  price: number;
  rent: number;
  rent_type: string;
  description: string;
  created: string;
}

export default function ProductDetails({ name, categories, price, rent, rent_type: rentType, description, created }: ProductDetailsProps) {

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="xs">
          <Title order={3}>{name}</Title>
          <Text size="sm" c="dimmed">
            Categories:{" "}
            {categories.map((cat, idx) => (
              <Text component="span" color="blue" inherit key={cat.id}>
                {cat.name}
                {idx < categories.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
          <Text size="sm" c="blue">
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
        </Stack>
      </Card>
    </>
  );
}
