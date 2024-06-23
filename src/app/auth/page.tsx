"use client";

import { useState } from "react";

import { CheckOtp, SendOtp } from "@/components/auth";
import { steps } from "@/constants";

export default function Auth() {
  const [step, setStep] = useState(steps.send);
  const [mobile, setMobile] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white w-full md:w-1/2 lg:w-1/3 m-5 px-5 py-10 text-right">
        <h2 className="text-xl pb-5">ورود به حساب کاربری</h2>
        <hr className="border border-grey-200 mb-10" />
        {step === steps.send && (
          <SendOtp setStep={setStep} setMobile={setMobile} />
        )}
        {step === steps.check && <CheckOtp mobile={mobile} />}
      </div>
    </div>
  );
}
