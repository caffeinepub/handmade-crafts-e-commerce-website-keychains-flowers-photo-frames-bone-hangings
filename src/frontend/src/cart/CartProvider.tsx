import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { CartItem, CartState } from './cartTypes';
import { loadCartFromStorage, saveCartToStorage, clearCartStorage } from './cartStorage';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: bigint;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartSnapshot: () => CartItem[];
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(() => loadCartFromStorage());

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existingIndex = prev.items.findIndex(i => i.productId === item.productId);
      if (existingIndex >= 0) {
        const newItems = [...prev.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
        };
        return { ...prev, items: newItems };
      }
      return {
        ...prev,
        items: [...prev.items, { ...item, quantity: 1 }],
      };
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart(prev => {
      if (quantity <= 0) {
        return {
          ...prev,
          items: prev.items.filter(i => i.productId !== productId),
        };
      }
      const newItems = prev.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
      return { ...prev, items: newItems };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(i => i.productId !== productId),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], version: cart.version });
    clearCartStorage();
  }, [cart.version]);

  const getCartSnapshot = useCallback(() => {
    return [...cart.items];
  }, [cart.items]);

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * BigInt(item.quantity), BigInt(0));

  const value: CartContextValue = {
    items: cart.items,
    itemCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartSnapshot,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
