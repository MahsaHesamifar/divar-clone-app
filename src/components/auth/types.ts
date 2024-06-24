import type { Dispatch, SetStateAction } from "react";

export interface CheckOtpProps {
  mobile: string;
}

export interface SendOtpProps {
  setStep: Dispatch<SetStateAction<string>>;
  setMobile: Dispatch<SetStateAction<string>>;
}

export interface CheckOtpInputTypes {
  code: string;
}

export interface SendOtpInputTypes {
  mobile: string;
}
