import { useProductList } from '../hooks/useProductList';

export default function ProductListPage() {
  const { products, loading, error } = useProductList();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      {products.map((p: any) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>${p.price}</p>
        </div>
      ))}
    </div>
  );
}
