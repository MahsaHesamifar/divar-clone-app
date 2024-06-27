"use client";

import { CreatePost } from "@/components/dashboard";
import { ProtectedRoute } from "@/components/wrappers";
import { roles } from "@/constants";
import { useGetMyPostsQuery } from "@/services/post";

export default function UserPanel() {
  const { data, isLoading } = useGetMyPostsQuery();
  console.log(data);
  return (
    <ProtectedRoute authorizedRoles={[roles.user, roles.admin]}>
      <div className="py-10 px-5 flex flex-col items-center">
        <h2 className="font-bold text-xl">اضافه کردن آگهی: </h2>
        <CreatePost />

        <h2 className="font-bold text-xl my-10">لیست آگهی های من: </h2>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <div className="flex flex-wrap justify-center w-full">
            {data &&
              data.posts?.map((post, index) => {
                return (
                  <div
                    key={index}
                    className={
                      "rounded border border-grey-400 px-4 py-2 m-1 flex justify-between"
                    }
                  >
                    {post?.options?.title}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
