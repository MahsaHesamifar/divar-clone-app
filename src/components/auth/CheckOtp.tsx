"use client";

import { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { Button, Input } from "@/components/elements";
import { messages } from "@/constants";
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
      toast.error(messages.auth.getRole.error);
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
      toast.error(messages.auth.checkOtp.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="font-bold my-5">کد تأیید را وارد کنید</p>
      <p className="text-grey-400 my-5">کد پیامک‌شده را وارد کنید.</p>

      <Input
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
        <Button type="submit" isLoading={isLoading} text={"تایید"} />
      </div>
    </form>
  );
};
