export interface Post {
  _id: string;
  amount: number;
  category: string;
  images: string[];
  options: { title: string; content: string; city: string };
}

export interface Message {
  message: string;
}

export interface GetMyPostsRes {
  posts: Post[];
  count: number;
}

export interface GetPostByIdRes {
  post: Post;
}

export interface DeletePostRes extends Message {}

export interface DeletePostReq {
  id: string;
}

export interface CreatePostRes extends Message {}

export type CreatePostReq = FormData;
