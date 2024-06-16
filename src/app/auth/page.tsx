"use client";

import { useState } from "react";

import { steps } from "@/constants";
import { SendOtp, CheckOtp } from "@/components/auth";

export default function Auth() {
  const [step, setStep] = useState(steps.send);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white w-full md:w-1/2 lg:w-1/3 m-5 px-5 py-10 text-right">
        <h2 className="text-xl pb-5">ورود به حساب کاربری</h2>
        <hr className="border border-grey-200 mb-10" />
        {step === steps.send && <SendOtp step={step} setStep={setStep} />}
        {step === steps.check && <CheckOtp />}
      </div>
    </div>
  );
}
