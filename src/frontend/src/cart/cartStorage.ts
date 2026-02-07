import type { CartState } from './cartTypes';

const CART_STORAGE_KEY = 'handmade-crafts-cart';
const CART_VERSION = 1;

export function loadCartFromStorage(): CartState {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return { items: [], version: CART_VERSION };
    }
    const parsed = JSON.parse(stored) as CartState;
    if (parsed.version !== CART_VERSION) {
      return { items: [], version: CART_VERSION };
    }
    // Convert price strings back to bigint
    const items = parsed.items.map(item => ({
      ...item,
      price: BigInt(item.price.toString()),
    }));
    return { ...parsed, items };
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return { items: [], version: CART_VERSION };
  }
}

export function saveCartToStorage(cart: CartState): void {
  try {
    // Convert bigint to string for JSON serialization
    const serializable = {
      ...cart,
      items: cart.items.map(item => ({
        ...item,
        price: item.price.toString(),
      })),
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serializable));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
}

export function clearCartStorage(): void {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing cart storage:', error);
  }
}
