export interface CheckOtpProps {
  mobile: string;
}

export interface SendOtpProps {
  setStep: React.Dispatch<React.SetStateAction<string>>;
  setMobile: React.Dispatch<React.SetStateAction<string>>;
}

export interface CheckOtpInputTypes {
  code: string;
}

export interface SendOtpInputTypes {
  mobile: string;
}
