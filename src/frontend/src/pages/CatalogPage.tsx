import { useState } from 'react';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';
import { useGetAllProducts, useGetProductsByCategory } from '../hooks/useQueries';
import { Card } from '@/components/ui/card';

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: allProducts = [], isLoading: isLoadingAll } = useGetAllProducts();
  const { data: categoryProducts = [], isLoading: isLoadingCategory } = useGetProductsByCategory(
    selectedCategory === 'all' ? '' : selectedCategory
  );

  const products = selectedCategory === 'all' ? allProducts : categoryProducts;
  const isLoading = selectedCategory === 'all' ? isLoadingAll : isLoadingCategory;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Product Catalog</h1>
        <p className="text-muted-foreground">
          Browse our collection of handmade treasures
        </p>
      </div>

      <div className="mb-8">
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="h-96 animate-pulse bg-muted" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
