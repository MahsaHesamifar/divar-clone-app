import { MessageResponse } from "@/types";

import { baseApi } from "../base";

import type { CreateCategoryPayload, GetCategoriesRes } from "./types";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<MessageResponse, CreateCategoryPayload>({
      query: ({ name, slug, icon }) => ({
        url: "category",
        method: "POST",
        body: {
          name,
          slug,
          icon,
        },
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    getCategories: builder.query<GetCategoriesRes, void>({
      query: () => "category",
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} = categoryApi;
