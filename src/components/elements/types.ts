import type { HTMLProps } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import type { Post } from "@/services/post";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  isLoading?: boolean;
  text: string;
}

export interface InputProps extends HTMLProps<HTMLInputElement> {
  showLabel?: boolean;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  isLeftToRight?: boolean;
}

export interface TextareaProps extends HTMLProps<HTMLTextAreaElement> {
  showLabel?: boolean;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  isLeftToRight?: boolean;
}

export interface SelectProps extends HTMLProps<HTMLSelectElement> {
  showLabel?: boolean;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  options: { id: string | number; name: string; value: string }[];
}

export interface PostBoxProps {
  post: Post;
  editable?: boolean;
}
