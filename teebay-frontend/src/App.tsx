import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
// import AddProductPage from './pages/AddProductPage';
// import TransactionsPage from './pages/TransactionsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={<RegisterPage />} />
      <Route path="/add-product" element={<AddProductPage />} />
      <Route path="/transactions" element={<TransactionsPage />} /> */}
    </Routes>
  );
}