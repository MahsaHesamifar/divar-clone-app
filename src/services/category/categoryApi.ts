import { baseStoreApi } from "../baseStore";

import type {
  CreateCategoryReq,
  CreateCategoryRes,
  GetCategoriesRes,
} from "./types";

export const categoryApi = baseStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<CreateCategoryRes, CreateCategoryReq>({
      query: ({ name, slug, icon, parent }) => ({
        url: "category",
        method: "POST",
        body: {
          name,
          slug,
          icon,
          parent,
        },
      }),
      invalidatesTags: ["Category"],
    }),
    getCategories: builder.query<GetCategoriesRes, void>({
      query: () => "category",
      providesTags: ["Category"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
