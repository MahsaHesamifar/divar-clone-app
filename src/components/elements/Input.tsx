import type { InputProps } from "./types";

export const Input = ({
  label,
  showLabel,
  name,
  registration,
  error,
  errorMessage,
  isLeftToRight,
  type = "text",
  ...props
}: InputProps) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label}:</label>}
      <input
        id={name}
        className={`w-full py-2 px-4 border-2 border-grey-200 rounded-lg mt-4 my-6 ${
          isLeftToRight ? "text-left" : null
        }`}
        dir={isLeftToRight ? "ltr" : ""}
        placeholder={label}
        type={type}
        {...registration}
        {...props}
      />
      {error && <p className="text-primary mb-2">{errorMessage}</p>}
    </>
  );
};
