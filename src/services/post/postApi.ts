import { baseStoreApi } from "../baseStore";

import type {
  CreatePostReq,
  CreatePostRes,
  DeletePostRes,
  GetAllPostsRes,
  GetMyPostsRes,
  GetPostByIdRes,
} from "./types";

export const postApi = baseStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<GetAllPostsRes, void>({
      query: () => "",
      providesTags: ["Post"],
    }),

    getMyPosts: builder.query<GetMyPostsRes, void>({
      query: () => "post/my",
      providesTags: ["Post"],
    }),

    getPostById: builder.query<GetPostByIdRes, string>({
      query: (id) => `post/${id}`,
      providesTags: ["Post"],
    }),

    createPost: builder.mutation<CreatePostRes, CreatePostReq>({
      query: (formData) => ({
        url: "post/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation<DeletePostRes, string>({
      query: (id) => ({
        url: `post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetMyPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;
