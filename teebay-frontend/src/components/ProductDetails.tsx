import {
  Container,
  Title,
  Text,
  Image,
  Divider,
  Group,
  Button,
  Stack,
  Badge,
  Card,
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
  imageUrls = [
    'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=601'
  ],
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
    <Stack gap="xl">
      {/* Image gallery */}
      <Card p="lg" radius="xl" style={{ background: 'rgba(248, 250, 252, 0.5)' }}>
        <Group gap="xs" align="center">
          <Button 
            variant="subtle" 
            onClick={handlePrev} 
            disabled={!canScrollLeft}
            style={{ borderRadius: '12px' }}
          >
            <IconArrowLeft size={18} />
          </Button>

          <Group gap="xs" style={{ flex: 1, overflow: 'hidden' }}>
            {imageUrls
              .slice(startIndex, startIndex + IMAGES_PER_VIEW)
              .map((url, idx) => (
                <div key={idx} style={{ flex: 1, borderRadius: '12px', overflow: 'hidden' }}>
                  <Image
                    src={url}
                    alt={`Product image ${idx}`}
                    width="100%"
                    height={200}
                    radius="md"
                    fit="cover"
                    style={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    className="hover-lift"
                  />
                </div>
              ))}
          </Group>

          <Button 
            variant="subtle" 
            onClick={handleNext} 
            disabled={!canScrollRight}
            style={{ borderRadius: '12px' }}
          >
            <IconArrowRight size={18} />
          </Button>
        </Group>
      </Card>

      {/* Product Info */}
      <Stack gap="lg">
        <Title order={1} className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
          {name}
        </Title>

        {/* Categories */}
        <Group gap="xs">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              size="lg"
              variant="light"
              style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                color: '#667eea',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '8px'
              }}
            >
              {cat.name}
            </Badge>
          ))}
        </Group>

        {/* Price and Rent */}
        <Card p="xl" radius="xl" style={{ 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
          border: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <Group justify="space-between" align="center">
            <div>
              <Text size="sm" c="dimmed" fw={500} mb="xs">Purchase Price</Text>
              <Text size="2xl" fw={700} style={{ color: '#10b981' }}>
                ${price}
              </Text>
            </div>
            <Divider orientation="vertical" />
            <div>
              <Text size="sm" c="dimmed" fw={500} mb="xs">Rental Price</Text>
              <Text size="2xl" fw={700} style={{ color: '#7c3aed' }}>
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
              </Text>
            </div>
          </Group>
        </Card>

        {/* Description */}
        <Card p="xl" radius="xl" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
          <Title order={4} mb="md" style={{ color: '#374151' }}>Description</Title>
          <Text size="md" lh={1.7} style={{ color: '#6b7280' }}>
            {description || 'No description provided for this product.'}
          </Text>
        </Card>

        <Divider />

        {/* Date */}
        <Group justify="center">
          <Badge variant="light" size="lg" color="gray">
            Posted on {formatDate(created)}
          </Badge>
        </Group>
      </Stack>
    </Stack>
  );
}