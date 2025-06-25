import { Card, Title, Text, Divider, Group, Image, Badge } from '@mantine/core';
import './ProductCard.css';
import { formatDate } from '../utils/utils';
import { useProfileDetails } from '../hooks/useProfileDetails';
import type { ReactNode } from 'react';

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
  children?: ReactNode;
}

export default function ProductCard({ 
  name, 
  categories, 
  ownerId, 
  price, 
  rent, 
  rentType, 
  description, 
  created, 
  thumbnailUrl = 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400', 
  children 
}: ProductCardProps) {
  const handleFetchProfile = (ownerId: number) => {
    return useProfileDetails(ownerId);
  }

  return (
    <Card shadow="xl" padding="xl" radius="xl" className="product-card hover-lift">
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <div style={{ flex: '0 0 120px' }}>
          <div className="product-image">
            <Image
              src={thumbnailUrl}
              alt="Product"
              width={120}
              height={120}
              radius="md"
              fit="cover"
            />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Title order={3} className="product-name" mb="sm">{name}</Title>

          <div className="category-line" style={{ marginBottom: '12px' }}>
            {categories.map((cat) => (
              <span key={cat.id} className="category-tag">
                {cat.name}
              </span>
            ))}
          </div>

          <div className="price-line">
            <Group justify="space-between">
              <Text size="sm" fw={500}>
                Price: <span className="price">${price}</span>
              </Text>
              <Text size="sm" fw={500}>
                Rent: <span className="rent">
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
            </Group>
          </div>

          <Text size="sm" className="description" c="dimmed">
            {description.length > 150 ? description.slice(0, 150) + '...' : description}
          </Text>
        </div>
      </div>

      <div className="product-footer">
        <Group justify="space-between" align="center" px="xl">
          <Badge variant="light" className="date-badge" size="sm">
            {formatDate(created)}
          </Badge>
          
          {children && <div style={{ display: 'flex', gap: '8px' }}>{children}</div>}
          
          {ownerId && (
            <Badge className="owner-badge" size="sm">
              @{handleFetchProfile(ownerId).user?.username || 'Unknown'}
            </Badge>
          )}
        </Group>
      </div>
    </Card>
  );
}