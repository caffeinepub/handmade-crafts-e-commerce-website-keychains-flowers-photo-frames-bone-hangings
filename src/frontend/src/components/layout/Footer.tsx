import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-semibold">Handmade Treasures</h3>
            <p className="text-sm text-muted-foreground">
              Discover unique handcrafted items made with love and care. From keychains to flowers,
              photo frames to decorative hangings, each piece tells a story.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Questions about our handmade crafts? We'd love to hear from you!
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © 2026. Built with <Heart className="h-4 w-4 fill-current text-red-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
