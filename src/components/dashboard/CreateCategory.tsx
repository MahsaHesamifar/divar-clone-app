import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, Input, Select } from "@/components/elements";
import { iconOptions, messages } from "@/constants";
import { useCreateCategoryMutation } from "@/services/category";

import type { Category } from "./types";

export const CreateCategory = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Category>();

  const onSubmit: SubmitHandler<Category> = async (data) => {
    const { name, slug, icon } = data;
    try {
      const result = await createCategory({
        name,
        slug,
        icon,
      });
      if (result.data) {
        toast.success(result.data.message ?? messages.category.create.success);
        reset();
      } else if ("error" in result) {
        toast.error(messages.category.create.error);
      }
    } catch (err) {
      toast.error(messages.category.create.error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:w-1/2 lg:mr-20"
    >
      <p className="font-bold my-5">اطلاعات زیر را وارد کنید</p>
      <Input
        showLabel={true}
        label="نام * "
        name="name"
        registration={register("name", {
          required: true,
        })}
        error={errors.name}
        errorMessage="لطفا نام را به درستی وارد نمایید"
      />

      <Input
        showLabel={true}
        label="اسلاگ"
        name="slug"
        registration={register("slug")}
        error={errors.slug}
        errorMessage="لطفا اسلاگ را به درستی وارد نمایید"
      />

      <Select
        showLabel={true}
        label="آیکون * "
        name="icon"
        registration={register("icon")}
        error={errors.icon}
        errorMessage={"لطفا آیکون را به درستی انتخاب نمایید"}
        options={iconOptions}
      />

      <hr className="border border-grey-200 mt-10 mb-5" />
      <div className="w-full flex justify-end">
        <Button type="submit" isLoading={isLoading} text="ثبت" />
      </div>
    </form>
  );
};
