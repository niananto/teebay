import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import type { ReactNode } from 'react';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/products" />;
}
