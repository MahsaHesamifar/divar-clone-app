"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { RootState } from "@/rtk/store";
import { useCheckOtpMutation } from "@/services/auth";
import { useRouter } from "next/navigation";
import { paths } from "@/utils/paths";
import { setTokens } from "@/rtk/features/authSlice";

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
        //TODO: display success message!
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
      <input
        className="w-full py-2 px-4 border-2 border-grey-200 rounded-lg text-left"
        dir="ltr"
        placeholder="code"
        {...register("code", {
          required: true,
        })}
      />
      {errors.code && (
        <p className="text-primary my-2">لطفا کد را به درستی وارد نمایید</p>
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
