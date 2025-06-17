import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type User = {
  id: number;
  username: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('teebay-user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('teebay-user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('teebay-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
