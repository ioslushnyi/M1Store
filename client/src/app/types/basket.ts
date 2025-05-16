import type { Discount } from "./discount";
import type { Product } from "./product";

export type Basket = {
  basketId: string;
  items: Item[];
  discounts: Discount[];
  totalPrice: number;
  merchandizeTotalPrice: number;
  shippingTotalPrice: number;
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
export type Item = {
  productId: number;
  product: Product;
  basePrice: number;
  price: number;
  quantity: number;
};
