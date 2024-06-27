import { baseStoreApi } from "../baseStore";

import type { GetMyPostsRes } from "./types";

export const postApi = baseStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyPosts: builder.query<GetMyPostsRes, void>({
      query: () => "post/my",
      providesTags: ["Post"],
    }),

    createPost: builder.mutation({
      query: ({ data, formData }) => ({
        url: "post/create",
        method: "POST",
        body: {
          title: data.title,
          content: data.content,
          amount: parseInt(data.amount),
          city: data.city,
          category: data.category,
          images: formData.images,
        },
        headers: {
          "Content-Type": "multipart/form-data;",
        },
        formData: true,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetMyPostsQuery, useCreatePostMutation } = postApi;
