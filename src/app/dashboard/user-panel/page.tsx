"use client";

import { CreatePost } from "@/components/dashboard";
import { Loading, PostBox } from "@/components/elements";
import { ProtectedRoute } from "@/components/wrappers";
import { roles } from "@/constants";
import { useGetMyPostsQuery } from "@/services/post";

export default function UserPanel() {
  const { data, isLoading } = useGetMyPostsQuery();

  return (
    <ProtectedRoute authorizedRoles={[roles.user, roles.admin]}>
      <div className="py-10 px-5 flex flex-col items-center">
        <h2 className="font-bold text-xl">اضافه کردن آگهی: </h2>
        <CreatePost />

        <h2 className="font-bold text-xl my-10">لیست آگهی های من: </h2>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full xl:w-2/3">
            {data &&
              data.posts?.map((post, index) => {
                return <PostBox post={post} key={index} editable />;
              })}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
