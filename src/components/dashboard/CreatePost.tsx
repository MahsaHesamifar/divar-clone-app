import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { CustomButton, InputField, SelectField } from "@/components/elements";
import { messages } from "@/constants";
import { useGetCategoriesQuery } from "@/services/category";
import { useCreatePostMutation } from "@/services/post";

import type { Post } from "./types";

export const CreatePost = () => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const [createPost, { isLoading }] = useCreatePostMutation();
  let categories = categoriesData?.map((category) => {
    return { name: category.name, value: category._id };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const onSubmit: SubmitHandler<Post> = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content ?? "");
    formData.append("city", data.city ?? "");
    formData.append("amount", data.amount.toString());
    formData.append("category", data.category);

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    try {
      const result = await createPost(formData);
      if (result.data) {
        toast.success(result.data.message ?? messages.post.create.success);
      }
    } catch (err) {
      toast.error(messages.post.create.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:w-1/2 lg:mr-20"
    >
      <p className="font-bold my-5">اطلاعات زیر را وارد کنید</p>
      <InputField
        showLabel
        label="عنوان * "
        name="title"
        registration={register("title", { required: true })}
        error={errors.title}
        errorMessage="لطفا عنوان را به درستی وارد نمایید"
      />
      <InputField
        showLabel
        label="توضیحات"
        name="content"
        registration={register("content")}
        error={errors.content}
        errorMessage="لطفا توضیحات را به درستی وارد نمایید"
      />
      <SelectField
        showLabel
        label="دسته بندی * "
        name="category"
        registration={register("category", { required: true })}
        error={errors.category}
        errorMessage="لطفا یک گزینه را انتخاب نمایید"
        options={categories ?? []}
      />
      <InputField
        showLabel
        label="شهر"
        name="city"
        registration={register("city")}
        error={errors.city}
        errorMessage="لطفا شهر را به درستی وارد نمایید"
      />
      <InputField
        showLabel
        label="قیمت * "
        name="amount"
        registration={register("amount", {
          required: true,
        })}
        error={errors.amount}
        errorMessage="لطفا قیمت را به درستی وارد نمایید"
        type="number"
      />
      <label htmlFor="images">آپلود عکس: </label>
      <input
        className="mt-4 mb-2"
        id="images"
        type="file"
        multiple
        {...register("images", {
          required: true,
        })}
      />
      {errors.images && (
        <p className="text-primary mb-2">
          {"لطفا برای این آگهی عکس آپلود کنید"}
        </p>
      )}
      <hr className="border border-grey-200 mt-10 mb-5" />
      <div className="w-full flex justify-end">
        <CustomButton type="submit" text="ثبت" isLoading={isLoading} />
      </div>
    </form>
  );
};
