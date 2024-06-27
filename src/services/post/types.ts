export interface Post {
  amount: number;
  category: string;
  images: string[];
  options: { title: string; content: string; city: string };
}

export interface GetMyPostsRes {
  posts: Post[];
  count: number;
}
