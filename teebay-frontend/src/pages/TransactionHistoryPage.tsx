import { useState } from 'react';
import {
  Container,
  Title,
  Tabs,
  Loader,
  Center,
  Grid,
  Text,
  Card,
  Badge,
  ThemeIcon
} from '@mantine/core';
import ProductCard from '../components/ProductCard';
import {
  useBoughtProducts,
  useSoldProducts,
  useBorrowedProducts,
  useLentProducts,
} from '../hooks/useTransactionHistory';
import { useAuth } from '../auth/AuthContext';
import { formatDate } from '../utils/utils';
import { IconShoppingBag, IconCoin, IconCalendarEvent, IconHandStop } from '@tabler/icons-react';

export default function TransactionHistoryPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Bought');
  const { products: boughtData, loading: loadingBought } = useBoughtProducts(user?.id || -1);
  const { products: soldData, loading: loadingSold } = useSoldProducts(user?.id || -1);
  const { products: borrowedData, loading: loadingBorrowed } = useBorrowedProducts(user?.id || -1);
  const { products: lentData, loading: loadingLent } = useLentProducts(user?.id || -1);

  const renderProducts = (products: any[], rentData?: any[]) => {
    if (products.length === 0) {
      return (
        <div className="empty-state">
          <Text className="empty-state-title">No transactions yet</Text>
          <Text className="empty-state-text">Your transaction history will appear here</Text>
        </div>
      );
    }

    return (
      <Grid>
        {products.map((p: any, idx: number) => (
          <Grid.Col span={12} key={p.id}>
            <ProductCard
              name={p.name}
              description={p.description}
              price={p.price}
              rent={p.rent}
              rentType={p.rent_type}
              categories={p.categories}
              created={p.created}
            >
              {rentData && rentData[idx] && (
                <Badge 
                  variant="light" 
                  color="blue"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}
                >
                  {formatDate(rentData[idx].start)} - {formatDate(rentData[idx].end)}
                </Badge>
              )}
            </ProductCard>
          </Grid.Col>
        ))}
      </Grid>
    );
  };

  return (
    <Container size="lg" py="xl">
      <Card className="glass-card" p="2rem" radius="xl">
        <Title order={2} mb="xl" ta="center" className="gradient-text">
          Transaction History
        </Title>
        
        <Tabs 
          value={activeTab} 
          onChange={(value) => value && setActiveTab(value)}
          styles={{
            tab: {
              borderRadius: '12px',
              border: '1px solid rgba(102, 126, 234, 0.1)',
              background: 'rgba(255, 255, 255, 0.5)',
              margin: '0 4px',
              transition: 'all 0.3s ease',
            },
            tabLabel: {
              fontWeight: 600,
            }
          }}
        >
          <Tabs.List grow mb="xl">
            <Tabs.Tab 
              value="Bought"
              leftSection={
                <ThemeIcon size={20} variant="light" color="green" radius="xl">
                  <IconShoppingBag size={14} />
                </ThemeIcon>
              }
            >
              Bought
            </Tabs.Tab>
            <Tabs.Tab 
              value="Sold"
              leftSection={
                <ThemeIcon size={20} variant="light" color="blue" radius="xl">
                  <IconCoin size={14} />
                </ThemeIcon>
              }
            >
              Sold
            </Tabs.Tab>
            <Tabs.Tab 
              value="Borrowed"
              leftSection={
                <ThemeIcon size={20} variant="light" color="orange" radius="xl">
                  <IconCalendarEvent size={14} />
                </ThemeIcon>
              }
            >
              Borrowed
            </Tabs.Tab>
            <Tabs.Tab 
              value="Lent"
              leftSection={
                <ThemeIcon size={20} variant="light" color="purple" radius="xl">
                  <IconHandStop size={14} />
                </ThemeIcon>
              }
            >
              Lent
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Bought" pt="md">
            {loadingBought ? <Center><Loader size="lg" /></Center> : renderProducts(boughtData)}
          </Tabs.Panel>

          <Tabs.Panel value="Sold" pt="md">
            {loadingSold ? <Center><Loader size="lg" /></Center> : renderProducts(soldData)}
          </Tabs.Panel>

          <Tabs.Panel value="Borrowed" pt="md">
            {loadingBorrowed ? (
              <Center><Loader size="lg" /></Center>
            ) : (
              renderProducts(
                borrowedData.map((item: any) => item.product),
                borrowedData.map((item: any) => ({
                  start: item.rent_start,
                  end: item.rent_end,
                }))
              )
            )}
          </Tabs.Panel>

          <Tabs.Panel value="Lent" pt="md">
            {loadingLent ? (
              <Center><Loader size="lg" /></Center>
            ) : (
              renderProducts(
                lentData.map((item: any) => item.product),
                lentData.map((item: any) => ({
                  start: item.rent_start,
                  end: item.rent_end,
                }))
              )
            )}
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Container>
  );
}