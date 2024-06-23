import { SubmitHandler, useForm } from "react-hook-form";

import { CustomButton, InputField } from "@/components/elements";

import type { Post } from "./types";

export const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const onSubmit: SubmitHandler<Post> = (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:w-1/2 lg:mr-20"
    >
      <p className="font-bold my-5">اطلاعات زیر را وارد کنید</p>
      <InputField
        showLabel={true}
        label="نام * "
        name="name"
        registration={register("name", {
          required: true,
        })}
        error={errors.name}
        errorMessage="لطفا نام را به درستی وارد نمایید"
      />

      <hr className="border border-grey-200 mt-10 mb-5" />
      <div className="w-full flex justify-end">
        <CustomButton type="submit" text="تایید" />
      </div>
    </form>
  );
};
