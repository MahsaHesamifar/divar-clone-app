import React from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

import { useDeletePostMutation } from "@/services/post";
import { paths } from "@/utils";

import type { PostBoxProps } from "./types";

export const PostBox = ({ post, editable = false }: PostBoxProps) => {
  const [deletePost] = useDeletePostMutation();

  const deletePostHandler = async () => {
    try {
      const result = await deletePost({ id: post._id });
      if (result.data) {
        toast.success(result.data.message ?? "Category deleted successfuly");
      }
    } catch (err) {
      toast.error("Something went wrong");
      throw err;
    }
  };

  return (
    <div
      className={
        "rounded border border-grey-200 m-1 flex flex-col justify-between bg-white"
      }
    >
      <Link
        href={paths.postShow(post._id)}
        className="flex justify-between p-4"
      >
        <div>
          <div className="font-bold text-lg mb-1">{post?.options?.title}</div>
          <div className="text-grey-400 text-sm">
            {post?.amount.toLocaleString()}
            {" تومان"}
          </div>
        </div>

        <Image
          className="bg-grey-200 rounded w-[140px] h-[140px] object-cover"
          src={
            post.images[0]
              ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.images[0]}`
              : "/empty.png"
          }
          alt={post?.options?.title ?? "image"}
          width={140}
          height={140}
          priority
        />
      </Link>

      {editable && (
        <button
          onClick={deletePostHandler}
          className="text-primary rounded mx-4 mb-4 py-1 px-2 bg-primary/10 hover:bg-primary/20"
        >
          حذف
        </button>
      )}
    </div>
  );
};
