import { baseStoreApi } from "../baseStore";

import type {
  CreateCategoryReq,
  CreateCategoryRes,
  DeleteCategoryRes,
  GetCategoriesRes,
} from "./types";

export const categoryApi = baseStoreApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<CreateCategoryRes, CreateCategoryReq>({
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

    deleteCategory: builder.mutation<DeleteCategoryRes, string>({
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
