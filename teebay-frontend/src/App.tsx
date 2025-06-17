import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import EditProductPage from './pages/EditProductPage';
import AddProductPage from './pages/AddProductPage';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { PublicRoute } from './auth/PublicRoute';
import TopbarLayout from './components/TopbarLayout';
import './App.css'

export default function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<LandingPage />} /> */}
      <Route path="/" element={<TopbarLayout><LandingPage /></TopbarLayout>} />
      <Route path="/login" element={<TopbarLayout><PublicRoute><LoginPage /></PublicRoute></TopbarLayout>} />
      <Route path="/register" element={<TopbarLayout><PublicRoute><RegisterPage /></PublicRoute></TopbarLayout>} />
      <Route path="/products" element={<ProtectedRoute><ProductListPage /></ProtectedRoute>} />
      <Route path="/products/:id" element={<ProtectedRoute><ProductDetailsPage /></ProtectedRoute>} />
      <Route path="/products/:id/edit" element={<ProtectedRoute><EditProductPage /></ProtectedRoute>} />
      <Route path="/products/add" element={<ProtectedRoute><AddProductPage /></ProtectedRoute>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}