import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useGetProduct } from '../hooks/useQueries';
import { useCart } from '../cart/CartProvider';

export default function ProductDetailPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProduct(productId);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product && product.available) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Card className="h-96 animate-pulse bg-muted" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
        <Button onClick={() => navigate({ to: '/catalog' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Catalog
        </Button>
      </div>
    );
  }

  const priceInDollars = Number(product.price) / 100;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate({ to: '/catalog' })}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Catalog
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {!product.available && (
              <Badge variant="secondary">Out of Stock</Badge>
            )}
          </div>

          <Badge variant="outline" className="mb-4 w-fit">
            {product.category}
          </Badge>

          <p className="mb-6 text-4xl font-bold">${priceInDollars.toFixed(2)}</p>

          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="mb-3 text-lg font-semibold">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>

          <div className="mt-auto">
            <Button
              size="lg"
              className="w-full gap-2"
              disabled={!product.available}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {product.available ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
