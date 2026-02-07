interface CategoryIconProps {
  category: string;
  className?: string;
}

const categoryPositions: Record<string, number> = {
  keychains: 0,
  flowers: 1,
  'photo frames': 2,
  'bone hangings': 3,
};

export default function CategoryIcon({ category, className = 'h-16 w-16' }: CategoryIconProps) {
  const position = categoryPositions[category.toLowerCase()] ?? 0;
  const offsetX = position * 256;

  return (
    <div
      className={className}
      style={{
        backgroundImage: 'url(/assets/generated/category-icons-sprite.dim_1024x256.png)',
        backgroundPosition: `-${offsetX}px 0`,
        backgroundSize: '1024px 256px',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}
