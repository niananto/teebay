import {
  Container,
  Title,
  Text,
  Image,
  Divider,
  Group,
  Button,
} from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
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
  imageUrls?: string[];
}

export default function ProductDetails({
  name,
  categories,
  price,
  rent,
  rent_type: rentType,
  description,
  created,
  imageUrls = ['https://picsum.photos/600', 'https://picsum.photos/601', 'https://picsum.photos/602', 'https://picsum.photos/603', 'https://picsum.photos/604'],
}: ProductDetailsProps) {
  const [startIndex, setStartIndex] = useState(0);
  const IMAGES_PER_VIEW = 3;

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + IMAGES_PER_VIEW < imageUrls.length;

  const handlePrev = () => {
    if (canScrollLeft) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (canScrollRight) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <Container size="md" pt="md" pos="relative">
      {/* Image gallery */}
      <Group gap="xs" mb="md" align="center">
        <Button variant="subtle" onClick={handlePrev} disabled={!canScrollLeft}>
          <IconArrowLeft size={18} />
        </Button>

        <Group gap="xs" style={{ flex: 1, overflow: 'hidden' }}>
          {imageUrls
            .slice(startIndex, startIndex + IMAGES_PER_VIEW)
            .map((url, idx) => (
              <Image
                key={idx}
                src={url}
                alt={`Product image ${idx}`}
                width="100%"
                height={180}
                radius="md"
                fit="cover"
                style={{ flex: 1, objectFit: 'cover', minWidth: 0 }}
              />
            ))}
        </Group>

        <Button variant="subtle" onClick={handleNext} disabled={!canScrollRight}>
          <IconArrowRight size={18} />
        </Button>
      </Group>

      {/* Title */}
      <Title order={2} mb="xs">{name}</Title>

      {/* Categories */}
      <Text size="sm" c="dimmed" mb="sm">
        Categories:{' '}
        {categories.map((cat, idx) => (
          <Text component="span" color="blue" inherit key={cat.id}>
            {cat.name}
            {idx < categories.length - 1 ? ', ' : ''}
          </Text>
        ))}
      </Text>

      {/* Price and Rent */}
      <Text size="md" mb="sm">
        Price:{' '}
        <span style={{ color: '#0d9488', fontWeight: 'bold' }}>${price}</span>{' '}
        | Rent:{' '}
        <span style={{ color: '#7c3aed', fontWeight: 'bold' }}>
          {(() => {
            switch (rentType.toLowerCase()) {
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

      {/* Description */}
      <Text size="sm" lh={1.6} mb="md">
        {description}
      </Text>

      <Divider mb="sm" />

      {/* Date */}
      <Group justify="space-between">
        <Text size="xs" c="gray">Date posted: {formatDate(created)}</Text>
      </Group>
    </Container>
  );
}
