# Specification

## Summary
**Goal:** Build a handmade crafts e-commerce storefront to browse products by category, view product details, manage a cart, and place orders with confirmation.

**Planned changes:**
- Create public pages: Home (shop intro + featured categories/items), Catalog (category browsing/filtering), Product Detail (images, description, price, availability).
- Add shopping cart: add items from catalog/detail, update quantities, remove items, show subtotal, and persist cart via local storage.
- Implement checkout flow: collect buyer details (name, phone/email, shipping address, optional notes), validate required fields, submit order, and show confirmation with order ID and item summary.
- Build backend (single Motoko actor): data models and APIs to list products, get product by ID, create an order (return unique ID), and fetch order details by ID; include a small seeded product set across the four categories.
- Add navigation and layout: header with shop name and links (Home/Catalog/Cart) with cart count badge; footer with basic shop info; ensure all UI text is in English.
- Apply a consistent handmade-crafts visual theme (warm, non blue/purple-dominant) across components and pages.
- Add and render generated static images in the frontend (logo, hero banner, category icons).

**User-visible outcome:** Visitors can browse handmade craft items by category, view product details, add items to a persistent cart, complete a checkout form to place an order, and see an order confirmation with an order ID.
