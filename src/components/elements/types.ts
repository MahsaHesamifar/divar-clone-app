import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import type { Post } from "@/services/post";

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
  type?: "text" | "number" | "password" | "email";
}

export interface SelectFieldProps {
  showLabel?: boolean;
  label: string;
  name: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  options: { name: string; value: string }[];
}

export interface PostBoxProps {
  post: Post;
  editable?: boolean;
}
