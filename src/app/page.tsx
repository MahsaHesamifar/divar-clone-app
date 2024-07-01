"use client";

import Image from "next/image";

import { Loading, PostBox } from "@/components/elements";
import { useGetCategoriesQuery } from "@/services/category";
import { useGetAllPostsQuery } from "@/services/post";

export default function Home() {
  const { data: postsData, isLoading: postsIsLoading } = useGetAllPostsQuery();
  const { data: categoriesData, isLoading: categoriesIsLoading } =
    useGetCategoriesQuery();

  return (
    <main className="flex flex-col items-center justify-center xl:flex-row xl:items-start py-10 px-5 xl:px-60">
      {postsIsLoading || categoriesIsLoading ? (
        <Loading />
      ) : (
        <>
          <div className="w-1/4">
            <div className="text-sm mb-4">دسته ها</div>
            <div>
              {categoriesData?.map((category) => {
                return (
                  <div
                    key={category._id}
                    className="text-grey-400 py-2 flex items-center"
                  >
                    <Image
                      className="ml-2"
                      src={`/icons/${category.icon}.svg`}
                      alt={category.name}
                      width={30}
                      height={30}
                      priority
                    />
                    {category.name}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full xl:w-3/4">
            {postsData &&
              postsData.posts?.map((post) => {
                return <PostBox post={post} key={post._id} />;
              })}
          </div>
        </>
      )}
    </main>
  );
}
