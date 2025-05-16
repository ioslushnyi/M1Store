import type { Product } from "./product";

export type Basket = {
  basketId: string;
  items: Item[];
};

/**
export class Item {
  constructor(product: Product, quantity: number) {
    this.productId = product.id;
    this.name = product.name;
    this.pictureUrl = product.pictureUrl;
    this.brand = product.brand;
    this.type = product.type;
    this.quantity = quantity;
    this.price = product.price;
  }
  productId: number;
  name: string;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
  price: number;
}
*/
export class Item {
  constructor(product: Product, quantity: number) {
    this.productId = product.id;
    this.product = product;
    this.basePrice = product.price;
    this.quantity = quantity;
    this.price = this.basePrice * this.quantity;
  }
  productId: number;
  product: Product;
  basePrice: number;
  price: number;
  quantity: number;
}
