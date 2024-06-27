export interface Category {
  name: string;
  slug?: string;
  icon: string;
  parent?: string;
}

export interface Post {
  title?: string;
  content?: string;
  category: string;
  city?: string;
  amount: number;
  images: string[];
}
