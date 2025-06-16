import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import EditProductPage from './pages/EditProductPage';
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/products/:id/edit" element={<EditProductPage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}