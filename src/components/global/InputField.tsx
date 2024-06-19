import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  showLabel?: boolean;
  label: string;
  name: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  isLeftToRight?: boolean;
}

export const InputField = ({
  label,
  showLabel,
  name,
  registration,
  error,
  errorMessage,
  isLeftToRight,
}: InputFieldProps) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label}:</label>}
      <input
        className={`w-full py-2 px-4 border-2 border-grey-200 rounded-lg mt-4 my-6 ${
          isLeftToRight ? "text-left" : null
        }`}
        dir={isLeftToRight ? "ltr" : ""}
        placeholder={label}
        {...registration}
      />
      {error && <p className="text-primary mb-2">{errorMessage}</p>}
    </>
  );
};
