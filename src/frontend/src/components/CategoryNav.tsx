import { Button } from '@/components/ui/button';
import CategoryIcon from './CategoryIcon';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Products', icon: null },
  { id: 'keychains', name: 'Keychains', icon: 'keychains' },
  { id: 'flowers', name: 'Flowers', icon: 'flowers' },
  { id: 'photo frames', name: 'Photo Frames', icon: 'photo frames' },
  { id: 'bone hangings', name: 'Bone Hangings', icon: 'bone hangings' },
];

export default function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map(category => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          className="flex items-center gap-2"
          onClick={() => onSelectCategory(category.id)}
        >
          {category.icon && <CategoryIcon category={category.icon} className="h-5 w-5" />}
          {category.name}
        </Button>
      ))}
    </div>
  );
}
