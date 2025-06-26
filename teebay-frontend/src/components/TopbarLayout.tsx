import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import {
  ShoppingBagIcon,
  SearchIcon,
  PlusIcon,
  HistoryIcon,
  UserIcon,
  LogOutIcon,
} from './icons'
import type { ReactNode } from 'react';

export default function TopbarLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/20 bg-white/95 backdrop-blur p-4 shadow">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/teebay.png" alt="Teebay logo" style={{ height: '40px' }} />
            <span className="text-xl font-bold gradient-text">TeeBay</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/products">
                <Button variant="ghost" className="gap-1">
                  <ShoppingBagIcon className="h-4 w-4" /> My Products
                </Button>
              </Link>
              <Link to="/products/browse">
                <Button variant="ghost" className="gap-1">
                  <SearchIcon className="h-4 w-4" /> Browse Products
                </Button>
              </Link>
              <Link to="/products/add">
                <Button className="gap-1 bg-indigo-500 text-white hover:bg-indigo-600">
                  <PlusIcon className="h-4 w-4" /> Add Product
                </Button>
              </Link>
              <Link to="/transactions">
                <Button variant="ghost" className="gap-1">
                  <HistoryIcon className="h-4 w-4" /> Transactions
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-7 w-7 rounded-full overflow-hidden">
                      <AvatarImage src={user.profilePicture || '/default-avatar.png'} />
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={logout} className="text-red-600 flex items-center gap-2">
                    <LogOutIcon className="h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button variant="ghost">Register</Button>
              </Link>
              <Link to="/login">
                <Button className="bg-indigo-500 text-white hover:bg-indigo-600">Login</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <main>{children}</main>
    </>
  );
}