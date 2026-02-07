export interface CartItem {
  productId: string;
  name: string;
  price: bigint;
  quantity: number;
  imageUrl: string;
}

export interface CartState {
  items: CartItem[];
  version: number;
}
