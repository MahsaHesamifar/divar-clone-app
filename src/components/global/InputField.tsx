import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  showLabel?: boolean;
  label: string;
  name: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
}

export const InputField = ({
  label,
  showLabel,
  name,
  registration,
  error,
  errorMessage,
}: InputFieldProps) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label}:</label>}
      <input
        className="w-full py-2 px-4 border-2 border-grey-200 rounded-lg mt-4 my-6"
        placeholder={label}
        {...registration}
      />
      {error && <p className="text-primary mb-2">{errorMessage}</p>}
    </>
  );
};