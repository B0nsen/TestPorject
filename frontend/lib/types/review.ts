export interface Review {
  id: number;
  userName: string;
  title: string;
  date: string;
  country: string;
  rating: number;
  fullText: string;
  helpfulCount: number;
  images: string[];
  userAvatar: string | null;
}
