import { Link } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '../backend';
import { useCart } from '../cart/CartProvider';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  const priceInDollars = Number(product.price) / 100;

  return (
    <Link to="/product/$productId" params={{ productId: product.id }}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 font-semibold">{product.name}</h3>
            {!product.available && (
              <Badge variant="secondary" className="shrink-0 text-xs">
                Out of Stock
              </Badge>
            )}
          </div>
          <p className="mb-2 text-sm text-muted-foreground">{product.category}</p>
          <p className="text-lg font-bold">${priceInDollars.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            size="sm"
            className="w-full"
            disabled={!product.available}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
