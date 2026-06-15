export type Limited = {
  id: number;
  title: string;
  price: number;
  listPrice?: number;
  discountPercent?: number;
  rating: number;
  imageUrl: string;
};