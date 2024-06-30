"use client";

import { toast } from "react-toastify";
import Image from "next/image";

import { CreateCategory } from "@/components/dashboard";
import { ProtectedRoute } from "@/components/wrappers";
import { messages, roles } from "@/constants";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/services/category";

export default function AdminPanel() {
  const { data: categoriesData, isLoading } = useGetCategoriesQuery();
  const [deleteCategory, { isLoading: deleteIsLoading }] =
    useDeleteCategoryMutation();

  const deleteCategoryHandler = async (id: string) => {
    try {
      const result = await deleteCategory({ id });
      if (result.data) {
        toast.success(result.data.message ?? messages.category.delete.success);
      } else if ("error" in result) {
        toast.error(messages.category.delete.error);
      }
    } catch (err) {
      toast.error(messages.category.delete.error);
      throw err;
    }
  };

  return (
    <ProtectedRoute authorizedRoles={[roles.admin]}>
      <div className="py-10 px-5 flex flex-col items-center">
        <h2 className="font-bold text-xl">اضافه کردن دسته بندی: </h2>
        <CreateCategory />

        <h2 className="font-bold text-xl my-10">لیست دسته بندی ها: </h2>
        {isLoading || deleteIsLoading ? (
          <>Loading...</>
        ) : (
          <div className="flex flex-wrap justify-center w-2/3">
            {categoriesData &&
              categoriesData.map((category, index) => {
                const iconSrc = require(`@/icons/${category.icon}.svg`).default;

                return (
                  <div
                    key={index}
                    className={
                      "rounded bg-white shadow-sm border border-grey-200 px-4 py-2 m-1 flex justify-between"
                    }
                  >
                    <Image
                      className="ml-2"
                      src={iconSrc}
                      alt={category.name}
                      width={25}
                      height={25}
                      priority
                    />
                    {category.name}
                    <button
                      className="mr-5 px-2 rounded-full text-primary bg-primary/5 hover:bg-primary/20"
                      onClick={() => deleteCategoryHandler(category._id)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
