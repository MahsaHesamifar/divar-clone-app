import { baseStoreApi } from "../baseStore";
import {
  CreateCategoryRes,
  CreateCategoryReq,
  GetCategoriesRes,
} from "../category";

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
    }),
    getCategories: builder.query<GetCategoriesRes, void>({
      query: () => "category",
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
