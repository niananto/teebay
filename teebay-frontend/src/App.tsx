import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OwnedProductListPage from './pages/OwnedProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import EditProductPage from './pages/EditProductPage';
import AddProductPage from './pages/AddProductPage';
import ProfilePage from './pages/ProfilePage';
import OthersProductListPage from './pages/OthersProductListPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { PublicRoute } from './auth/PublicRoute';
import TopbarLayout from './components/TopbarLayout';
import './App.css'

export default function App() {
  return (
    <div className="main-content">
      <TopbarLayout>
        <div className="page-container fade-in">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
            <Route path="/products" element={<PublicRoute><OwnedProductListPage /></PublicRoute>} />
            <Route path="/products/:id" element={<PublicRoute><ProductDetailsPage /></PublicRoute>} />
            <Route path="/products/:id/edit" element={<PublicRoute><EditProductPage /></PublicRoute>} />
            <Route path="/products/add" element={<PublicRoute><AddProductPage /></PublicRoute>} />
            <Route path="/profile" element={<PublicRoute><ProfilePage /></PublicRoute>} />
            <Route path="/products/browse" element={<PublicRoute><OthersProductListPage /></PublicRoute>} />
            <Route path="/transactions" element={<PublicRoute><TransactionHistoryPage /></PublicRoute>} />
            <Route path="*" element={<div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <h2 className="gradient-text">404 - Page Not Found</h2>
            </div>} />
          </Routes>
        </div>
      </TopbarLayout>
    </div>
  );
}