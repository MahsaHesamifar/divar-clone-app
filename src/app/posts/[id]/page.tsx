"use client";

import React from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";

import { useGetPostByIdQuery } from "@/services/post";

export default function PostShowPage() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useGetPostByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !data) {
    return notFound();
  }

  if (error) {
    throw error;
  }

  const post = data?.post;

  return (
    <div className="flex flex-col items-center w-full py-20 px-5 min-h-[80vh]">
      <div className="flex flex-col lg:flex-row lg:w-2/3">
        <div className="w-full lg:w-1/2 md:ml-10">
          <h2 className="font-bold text-2xl">{post.options.title}</h2>
          <div className="text-grey-400 py-5">{post.options.city}</div>
          <hr className="border-grey-300" />

          <div className="flex justify-between items-center py-3">
            <span className="text-grey-400">قیمت</span>
            <span>{post.amount.toLocaleString()} تومان </span>
          </div>
          <hr className="border-grey-300" />

          <div className="py-3">
            <span>توضیحات </span>
            <p>{post.options.content}</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 py-10 lg:py-0">
          <Image
            className="bg-grey-200 rounded object-cover w-full"
            src={
              post.images[0]
                ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.images[0]}`
                : "/empty.png"
            }
            alt={post?.options?.title ?? "image"}
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </div>
  );
}
