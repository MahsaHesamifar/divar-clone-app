"use client";

import { SubmitHandler,useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { CustomButton,InputField } from "@/components/global";
import { setTokens } from "@/rtk/features/authSlice";
import { RootState } from "@/rtk/store";
import { useCheckOtpMutation } from "@/services/auth";
import { paths } from "@/utils/paths";

type Inputs = {
  code: string;
};

export const CheckOtp = () => {
  const [checkOtp, { isLoading }] = useCheckOtpMutation();

  const mobile = useSelector((state: RootState) => state.auth.mobile);

  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await checkOtp({
        mobile,
        code: data.code,
      });
      if (result.data) {
        dispatch(
          setTokens({
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
          })
        );

        router.push(paths.home());
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="font-bold my-5">کد تأیید را وارد کنید</p>
      <p className="text-grey-400 my-5">کد پیامک‌شده را وارد کنید.</p>

      <InputField
        label="code"
        name="code"
        registration={register("code", {
          required: true,
        })}
        error={errors.code}
        errorMessage={"لطفا کد را به درستی وارد نمایید"}
        isLeftToRight
      />

      <hr className="border border-grey-200 mt-10 mb-5" />
      <div className="w-full flex justify-end">
        <CustomButton type="submit" isLoading={isLoading} text={"تایید"} />
      </div>
    </form>
  );
};
