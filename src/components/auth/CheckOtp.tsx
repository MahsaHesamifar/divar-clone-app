"use client";

import { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { CustomButton, InputField } from "@/components/elements";
import { useCheckOtpMutation, useGetUserRoleQuery } from "@/services/auth";
import { paths, setRole, setTokens } from "@/utils";

import type { CheckOtpInputTypes, CheckOtpProps } from "./types";

export const CheckOtp = ({ mobile }: CheckOtpProps) => {
  const token = Cookies.get("accessToken");

  const [checkOtp, { isLoading }] = useCheckOtpMutation();
  const { data: userRoleData, error: userRoleError } = useGetUserRoleQuery(
    undefined,
    { skip: !token }
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckOtpInputTypes>();

  useEffect(() => {
    if (userRoleData) {
      setRole(userRoleData.role);
      router.push(paths.userPanel());
    } else if (userRoleError) {
      console.error("Failed to fetch user role:", userRoleError);
    }
  }, [userRoleData, userRoleError, router]);

  const onSubmit: SubmitHandler<CheckOtpInputTypes> = async (values) => {
    try {
      const result = await checkOtp({
        mobile,
        code: values.code,
      });
      if (result.data) {
        setTokens({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });
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
