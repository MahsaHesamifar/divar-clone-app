import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface CustomButtonProps {
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  clickHandler?: () => {};
}

export interface InputFieldProps {
  showLabel?: boolean;
  label: string;
  name: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  isLeftToRight?: boolean;
}

export interface SelectFieldProps {
  showLabel?: boolean;
  label: string;
  name: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  options: string[];
}
