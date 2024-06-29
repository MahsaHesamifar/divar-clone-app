import type { HTMLProps } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import type { Post } from "@/services/post";

export interface CustomButtonProps {
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  clickHandler?: () => {};
}

export interface InputFieldProps extends HTMLProps<HTMLInputElement> {
  showLabel?: boolean;
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  isLeftToRight?: boolean;
}

export interface SelectFieldProps extends HTMLProps<HTMLSelectElement> {
  showLabel?: boolean;
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  options: { name: string; value: string }[];
}

export interface PostBoxProps {
  post: Post;
  editable?: boolean;
}
