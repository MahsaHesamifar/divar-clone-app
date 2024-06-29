import { baseStoreApi } from "../baseStore";

import type {
  CreatePostReq,
  CreatePostRes,
  DeletePostReq,
  DeletePostRes,
  GetMyPostsRes,
} from "./types";

export const postApi = baseStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyPosts: builder.query<GetMyPostsRes, void>({
      query: () => "post/my",
      providesTags: ["Post"],
    }),

    getPostById: builder.query({
      query: ({ id }) => `post/${id}`,
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

    deletePost: builder.mutation<DeletePostRes, DeletePostReq>({
      query: ({ id }) => ({
        url: `post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetMyPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;