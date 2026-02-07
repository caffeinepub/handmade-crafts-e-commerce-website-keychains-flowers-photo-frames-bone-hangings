import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '../../cart/CartProvider';
import BrandLogo from '../BrandLogo';

export default function Header() {
  const navigate = useNavigate();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <BrandLogo className="h-10 w-10" />
            <span className="text-xl font-semibold tracking-tight">Handmade Treasures</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="text-sm font-medium transition-colors hover:text-primary"
              activeProps={{ className: 'text-primary' }}
            >
              Catalog
            </Link>
          </nav>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => navigate({ to: '/cart' })}
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full px-1 text-xs"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
