import { useForm, SubmitHandler } from "react-hook-form";

import { iconOptions } from "@/constants";
import { InputField, SelectField } from "@/components/global";

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