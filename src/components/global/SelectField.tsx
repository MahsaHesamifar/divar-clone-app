import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface SelectFieldProps {
  showLabel?: boolean;
  label: string;
  name: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  errorMessage: string;
  options: string[];
}

export const SelectField = ({
  label,
  showLabel,
  name,
  registration,
  error,
  errorMessage,
  options,
}: SelectFieldProps) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label}:</label>}
      <select
        className="w-full py-2 px-4 border-2 border-grey-200 rounded-lg mt-4 my-6"
        {...registration}
      >
        {options.map((option, i) => (
          <option value={option} key={i}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-primary mb-2">{errorMessage}</p>}
    </>
  );
};
