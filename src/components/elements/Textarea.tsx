import type { TextareaProps } from "./types";

export const Textarea = ({
  label,
  showLabel,
  name,
  registration,
  error,
  errorMessage,
  isLeftToRight,
  ...props
}: TextareaProps) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label}:</label>}
      <textarea
        id={name}
        className={`w-full py-2 px-4 border-2 border-grey-200 rounded-lg mt-4 my-6 ${
          isLeftToRight ? "text-left" : null
        }`}
        dir={isLeftToRight ? "ltr" : ""}
        placeholder={label}
        {...registration}
        {...props}
      />
      {error && <p className="text-primary mb-2">{errorMessage}</p>}
    </>
  );
};
