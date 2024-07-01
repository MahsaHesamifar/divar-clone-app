import { MessageResponse } from "@/types";

import { baseStoreApi } from "../baseStore";

import type { CreateCategoryPayload, GetCategoriesRes } from "./types";

export const categoryApi = baseStoreApi.injectEndpoints({
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
