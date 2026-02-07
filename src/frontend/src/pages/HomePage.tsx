import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CategoryIcon from '../components/CategoryIcon';
import ProductCard from '../components/ProductCard';
import { useGetAllProducts } from '../hooks/useQueries';

const categories = [
  { id: 'keychains', name: 'Keychains', description: 'Unique handcrafted keychains' },
  { id: 'flowers', name: 'Flowers', description: 'Beautiful handmade flowers' },
  { id: 'photo frames', name: 'Photo Frames', description: 'Custom photo frames' },
  { id: 'bone hangings', name: 'Bone Hangings', description: 'Decorative hangings' },
];

export default function HomePage() {
  const { data: products = [], isLoading } = useGetAllProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Handcrafted with Love
              </h1>
              <p className="mb-6 text-lg text-muted-foreground md:text-xl">
                Discover unique handmade treasures. Each piece is crafted with care and attention to
                detail, bringing warmth and character to your life.
              </p>
              <Link to="/catalog">
                <Button size="lg" className="gap-2">
                  Shop Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative aspect-[8/3] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/assets/generated/crafts-hero.dim_1600x600.png"
                alt="Handmade crafts collection"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Browse by Category</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(category => (
              <Link key={category.id} to="/catalog" search={{ category: category.id }}>
                <Card className="group cursor-pointer transition-all hover:shadow-lg">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <CategoryIcon category={category.id} className="mb-4 h-20 w-20" />
                    <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/catalog">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="h-96 animate-pulse bg-muted" />
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No products available yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
