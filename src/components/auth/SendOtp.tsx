"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useSendOtpMutation } from "@/services/auth";
import { useDispatch } from "react-redux";
import { setMobile } from "@/rtk/features/authSlice";
import { steps } from "@/constants";

interface SendOtpProps {
  step: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

type Inputs = {
  mobile: string;
};

export const SendOtp = ({ step, setStep }: SendOtpProps) => {
  const dispatch = useDispatch();
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await sendOtp({ mobile: data.mobile });
      if (result.data) {
        dispatch(setMobile({ mobile: data.mobile }));
        setStep(steps.check);
        //TODO: display success message!
        console.log(result.data);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="font-bold my-5">شماره موبایل خود را وارد کنید</p>
      <p className="text-grey-400 my-5">
        برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد کنید. کد
        تأیید به این شماره پیامک خواهد شد.
      </p>
      <input
        className="w-full py-2 px-4 border-2 border-grey-200 rounded-lg text-left"
        dir="ltr"
        placeholder="شماره موبایل"
        {...register("mobile", {
          required: true,
          pattern: /^(\+98|0)?9\d{9}$/,
        })}
      />
      {errors.mobile && (
        <p className="text-primary my-2">
          لطفا شماره موبایل را به درستی وارد نمایید
        </p>
      )}

      <hr className="border border-grey-200 mt-10 mb-5" />
      <div className="w-full flex justify-end">
        {isLoading ? (
          <div>loading</div>
        ) : (
          <button
            type="submit"
            className="bg-primary rounded py-2 px-4 text-white"
          >
            تایید
          </button>
        )}
      </div>
    </form>
  );
};
