import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    id: string;
    contactInfo: string;
    productId: string;
    notes?: string;
    quantity: bigint;
    shippingAddress: string;
    buyerName: string;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    available: boolean;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getOrder(id: string): Promise<Order>;
    getProduct(id: string): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    placeOrder(order: Order): Promise<void>;
}
