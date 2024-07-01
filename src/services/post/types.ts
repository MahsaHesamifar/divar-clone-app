export interface Post {
  _id: string;
  amount: number;
  category: string;
  images: string[];
  options: { title: string; content: string; city: string };
}

export interface GetAllPostsRes {
  posts: Post[];
}

export interface GetMyPostsRes {
  posts: Post[];
  count: number;
}

export interface GetPostByIdRes {
  post: Post;
}

export type CreatePostPayload = FormData;
