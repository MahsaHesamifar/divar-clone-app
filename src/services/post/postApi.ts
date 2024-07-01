import { MessageResponse } from "@/types";

import { baseApi } from "../base";

import type {
  CreatePostPayload,
  GetAllPostsRes,
  GetMyPostsRes,
  GetPostByIdRes,
} from "./types";

export const postApi = baseApi.injectEndpoints({
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

    createPost: builder.mutation<MessageResponse, CreatePostPayload>({
      query: (formData) => ({
        url: "post/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation<MessageResponse, string>({
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
