import type { HTMLProps } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import type { Post } from "@/services/post";

export interface CustomButtonProps extends HTMLProps<HTMLButtonElement> {
  isLoading?: boolean;
  text: string;
}

export interface InputFieldProps extends HTMLProps<HTMLInputElement> {
  showLabel?: boolean;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  isLeftToRight?: boolean;
}

export interface SelectFieldProps extends HTMLProps<HTMLSelectElement> {
  showLabel?: boolean;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  options: { name: string; value: string }[];
}

export interface PostBoxProps {
  post: Post;
  editable?: boolean;
}
