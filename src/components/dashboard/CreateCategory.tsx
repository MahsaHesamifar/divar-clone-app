import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  slug?: string;
  icon: string;
  parent?: string;
};

export const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:w-1/2 lg:mr-20"
    >
      <p className="font-bold my-5">اطلاعات زیر را وارد کنید</p>

      <label htmlFor="name">نام:</label>
      <input
        className="w-full py-2 px-4 border-2 border-grey-200 rounded-lg mt-4 my-6"
        placeholder="نام"
        {...register("name", {
          required: true,
        })}
      />
      {errors.name && (
        <p className="text-primary mb-2">لطفا نام را به درستی وارد نمایید</p>
      )}

      <label htmlFor="slug">اسلاگ:</label>
      <input
        className="w-full py-2 px-4 border-2 border-grey-200 rounded-lg mt-4 my-6"
        placeholder="اسلاگ"
        {...register("slug", {})}
      />
      {errors.slug && (
        <p className="text-primary mb-2">لطفا اسلاگ را به درستی وارد نمایید</p>
      )}

      <label htmlFor="icon">آیکون:</label>
      <select
        className="w-full py-2 px-4 border-2 border-grey-200 rounded-lg mt-4 my-6"
        {...register("icon")}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      {errors.icon && (
        <p className="text-primary mb-2">
          لطفا آیکون را به درستی انتخاب نمایید
        </p>
      )}

      <label htmlFor="parent">پدر:</label>
      <input
        className="w-full py-2 px-4 border-2 border-grey-200 rounded-lg mt-4 my-6"
        placeholder="پدر"
        {...register("parent", {})}
      />
      {errors.parent && (
        <p className="text-primary mb-2">لطفا پدر را به درستی وارد نمایید</p>
      )}

      <hr className="border border-grey-200 mt-10 mb-5" />
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="bg-primary rounded py-2 px-4 text-white"
        >
          تایید
        </button>
      </div>
    </form>
  );
};
