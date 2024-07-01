"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { CustomButton, InputField } from "@/components/elements";
import { messages, steps } from "@/constants";
import { useSendOtpMutation } from "@/services/auth";

import type { SendOtpInputTypes, SendOtpProps } from "./types";

export const SendOtp = ({ setStep, setMobile }: SendOtpProps) => {
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOtpInputTypes>();

  const onSubmit: SubmitHandler<SendOtpInputTypes> = async (data) => {
    try {
      const result = await sendOtp({ mobile: data.mobile });
      if (result.data) {
        setMobile(data.mobile);
        setStep(steps.check);
        toast.success(result.data.message ?? messages.auth.sendOtp.success);
      }
    } catch (err) {
      toast.error(messages.auth.sendOtp.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="font-bold my-5">شماره موبایل خود را وارد کنید</p>
      <p className="text-grey-400 my-5">
        برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد کنید. کد
        تأیید به این شماره پیامک خواهد شد.
      </p>

      <InputField
        label="شماره موبایل"
        name="mobile"
        registration={register("mobile", {
          required: true,
          pattern: /^(\+98|0)?9\d{9}$/,
        })}
        error={errors.mobile}
        errorMessage="لطفا شماره موبایل را به درستی وارد نمایید"
        isLeftToRight
      />

      <hr className="border border-grey-200 mt-10 mb-5" />
      <div className="w-full flex justify-end">
        <CustomButton type="submit" isLoading={isLoading} text="تایید" />
      </div>
    </form>
  );
};
