export type Basket = {
  basketId: string;
  items: Item[];
};

export type Item = {
  productId: number;
  name: string;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
  price: number;
};
