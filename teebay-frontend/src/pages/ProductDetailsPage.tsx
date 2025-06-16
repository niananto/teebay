import ProductDetails from '../components/ProductDetails';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/useProductDetails';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  
  const { product, loading, error } = useProductDetails(Number(id));
  
    if (loading) return <div>Loading...</div>;
    if (error || !product) return <div>Failed to load product</div>;

  return <ProductDetails {...product} />;
}
