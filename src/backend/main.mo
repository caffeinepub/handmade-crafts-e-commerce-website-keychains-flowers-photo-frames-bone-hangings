import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import List "mo:core/List";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

actor {
  type Product = {
    id : Text;
    name : Text;
    category : Text;
    description : Text;
    price : Nat;
    available : Bool;
    imageUrl : Text;
  };

  module Product {
    public func compare(x : Product, y : Product) : Order.Order {
      Text.compare(x.id, y.id);
    };
  };

  type Order = {
    id : Text;
    buyerName : Text;
    contactInfo : Text;
    shippingAddress : Text;
    notes : ?Text;
    productId : Text;
    quantity : Nat;
  };

  module OrderModel {
    public func compare(x : Order, y : Order) : Order.Order {
      Text.compare(x.id, y.id);
    };
  };

  // Storage
  let productsMap = Map.empty<Text, Product>();
  let ordersMap = Map.empty<Text, Order>();

  // Products
  public shared ({ caller }) func addProduct(product : Product) : async () {
    productsMap.add(product.id, product);
  };

  public query ({ caller }) func getProduct(id : Text) : async Product {
    switch (productsMap.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    productsMap.values().toArray().filter(
      func(p) { p.category == category }
    );
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    productsMap.values().toArray();
  };

  // Orders
  public shared ({ caller }) func placeOrder(order : Order) : async () {
    switch (productsMap.get(order.productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        if (not product.available) { Runtime.trap("Product not available") };
        ordersMap.add(order.id, order);
      };
    };
  };

  public query ({ caller }) func getOrder(id : Text) : async Order {
    switch (ordersMap.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    ordersMap.values().toArray();
  };
};
