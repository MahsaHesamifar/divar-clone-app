import { SubmitHandler, useForm } from "react-hook-form";

import { CustomButton, InputField, SelectField } from "@/components/elements";
import { iconOptions } from "@/constants";
import { useCreateCategoryMutation } from "@/services/category";

import type { Category } from "./types";

export const CreateCategory = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>();

  const onSubmit: SubmitHandler<Category> = async (data) => {
    const { name, slug, icon, parent } = data;
    try {
      const result = await createCategory({
        name,
        slug,
        icon,
        parent,
      });
      if (result.data) {
        console.log(result.data);
      }
    } catch (err) {
      throw err;
    }
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

      <InputField
        showLabel={true}
        label="اسلاگ"
        name="slug"
        registration={register("slug")}
        error={errors.slug}
        errorMessage="لطفا اسلاگ را به درستی وارد نمایید"
      />

      <SelectField
        showLabel={true}
        label="آیکون * "
        name="icon"
        registration={register("icon")}
        error={errors.parent}
        errorMessage={"لطفا آیکون را به درستی انتخاب نمایید"}
        options={iconOptions}
      />

      <InputField
        showLabel={true}
        label="پدر"
        name="parent"
        registration={register("parent", {})}
        error={errors.parent}
        errorMessage="لطفا پدر را به درستی وارد نمایید"
      />

      <hr className="border border-grey-200 mt-10 mb-5" />
      <div className="w-full flex justify-end">
        <CustomButton type="submit" isLoading={isLoading} text="تایید" />
      </div>
    </form>
  );
};
