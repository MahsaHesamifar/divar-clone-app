"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { CustomButton, InputField } from "@/components/elements";
import { useCheckOtpMutation } from "@/services/auth";
import { paths, setTokens } from "@/utils";

import type { CheckOtpInputTypes, CheckOtpProps } from "./types";

export const CheckOtp = ({ mobile }: CheckOtpProps) => {
  const [checkOtp, { isLoading }] = useCheckOtpMutation();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckOtpInputTypes>();

  const onSubmit: SubmitHandler<CheckOtpInputTypes> = async (data) => {
    try {
      const result = await checkOtp({
        mobile,
        code: data.code,
      });
      if (result.data) {
        setTokens({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });
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
