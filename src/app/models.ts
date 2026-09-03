export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isOffer?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}