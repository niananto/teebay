import { useState } from 'react';
import {
  Container,
  Title,
  Tabs,
  Loader,
  Center,
  Grid,
  Text,
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

export default function TransactionHistoryPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Bought');
  const { products: boughtData, loading: loadingBought } = useBoughtProducts(user?.id || -1);
  const { products: soldData, loading: loadingSold } = useSoldProducts(user?.id || -1);
  const { products: borrowedData, loading: loadingBorrowed } = useBorrowedProducts(user?.id || -1);
  const { products: lentData, loading: loadingLent } = useLentProducts(user?.id || -1);

  const renderProducts = (products: any[], rentData?: any[]) => (
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
              <Text size="xs" color="dimmed">
                From {formatDate(rentData[idx].start)} to {formatDate(rentData[idx].end)}
              </Text>
            )}
          </ProductCard>
        </Grid.Col>
      ))}
    </Grid>
  );

  return (
    <Container>
      <Title order={2} mb="md">
        Transaction History
      </Title>
      <Tabs value={activeTab} onChange={(value) => value && setActiveTab(value)}>
        <Tabs.List>
          <Tabs.Tab value="Bought">Bought</Tabs.Tab>
          <Tabs.Tab value="Sold">Sold</Tabs.Tab>
          <Tabs.Tab value="Borrowed">Borrowed</Tabs.Tab>
          <Tabs.Tab value="Lent">Lent</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Bought" pt="md">
          {loadingBought ? <Center><Loader /></Center> : renderProducts(boughtData)}
        </Tabs.Panel>

        <Tabs.Panel value="Sold" pt="md">
          {loadingSold ? <Center><Loader /></Center> : renderProducts(soldData)}
        </Tabs.Panel>

        <Tabs.Panel value="Borrowed" pt="md">
          {loadingBorrowed ? (
            <Center><Loader /></Center>
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
            <Center><Loader /></Center>
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
    </Container>
  );
}
