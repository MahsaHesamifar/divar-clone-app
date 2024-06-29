"use client";

import { PostBox } from "@/components/elements";
import { useGetAllPostsQuery } from "@/services/post";

export default function Home() {
  const { data, isLoading } = useGetAllPostsQuery();

  return (
    <main className="flex flex-col items-center justify-between py-10 px-5">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full xl:w-2/3">
          {data &&
            data.posts?.map((post, index) => {
              return <PostBox post={post} key={index} />;
            })}
        </div>
      )}
    </main>
  );
}
