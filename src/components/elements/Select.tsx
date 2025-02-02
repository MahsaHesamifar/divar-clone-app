import type { SelectProps } from "./types";

export const Select = ({
  label,
  showLabel,
  name,
  registration,
  error,
  errorMessage,
  options,
  ...props
}: SelectProps) => {
  return (
    <>
      {showLabel && <label htmlFor={name}>{label}:</label>}
      <select
        id={name}
        className="w-full py-2 px-4 border-2 border-grey-200 rounded-lg mt-4 my-6"
        disabled={!options || options.length <= 1}
        {...registration}
        {...props}
      >
        {options.map((option) => (
          <option value={option.value} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="text-primary mb-2">{errorMessage}</p>}
    </>
  );
};
