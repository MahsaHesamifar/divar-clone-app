export interface Post {
  _id: string;
  amount: number;
  category: string;
  images: string[];
  options: { title: string; content: string; city: string };
}

export interface GetMyPostsRes {
  posts: Post[];
  count: number;
}

export interface DeletePostRes {
  message: string;
}

export interface DeletePostReq {
  id: string;
}
