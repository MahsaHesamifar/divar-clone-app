"use client";

import React from "react";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Loading } from "@/components/elements";
import { useGetPostByIdQuery } from "@/services/post";

import "swiper/css/navigation";
import "swiper/css/pagination";

import "swiper/css";

export default function PostShowPage() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useGetPostByIdQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !data) {
    return notFound();
  }

  if (error) {
    throw error;
  }

  const {
    post: { options },
    post,
  } = data;

  return (
    <div className="flex flex-col items-center w-full py-20 px-5 min-h-[80vh]">
      <div className="flex flex-col lg:flex-row w-full lg:w-2/3">
        <div className="w-full lg:w-1/2 md:ml-10">
          <h2 className="font-bold text-2xl">{options.title}</h2>
          <div className="text-grey-400 py-5">{options.city}</div>
          <hr className="border-grey-300" />

          <div className="flex justify-between items-center py-3">
            <span className="text-grey-400">قیمت</span>
            <span>{post.amount.toLocaleString()} تومان </span>
          </div>
          <hr className="border-grey-300" />

          <div className="py-3">
            <span>توضیحات </span>
            <p>{options.content}</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 py-10 lg:py-0">
          <Swiper
            pagination={{
              type: "bullets",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {post.images.map((image, index) => {
              return (
                <SwiperSlide key={image + index}>
                  <Image
                    className="bg-grey-200 rounded object-cover w-full"
                    src={
                      image
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${image}`
                        : "/images/empty.png"
                    }
                    alt={options?.title ?? "image"}
                    width={500}
                    height={500}
                    priority
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
