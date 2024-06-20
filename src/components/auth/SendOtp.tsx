"use client";

import { SubmitHandler,useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { CustomButton,InputField } from "@/components/global";
import { steps } from "@/constants";
import { setMobile } from "@/rtk/features/authSlice";
import { useSendOtpMutation } from "@/services/auth";

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

      <InputField
        label="شماره موبایل"
        name="mobile"
        registration={register("mobile", {
          required: true,
          pattern: /^(\+98|0)?9\d{9}$/,
        })}
        error={errors.mobile}
        errorMessage={"لطفا شماره موبایل را به درستی وارد نمایید"}
        isLeftToRight
      />

      <hr className="border border-grey-200 mt-10 mb-5" />
      <div className="w-full flex justify-end">
        <CustomButton type="submit" isLoading={isLoading} text={"تایید"} />
      </div>
    </form>
  );
};
