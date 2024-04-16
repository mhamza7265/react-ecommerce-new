import { useState } from "react";

function Select({
  name,
  register,
  label,
  error,
  options,
  onChange,
  value = "",
  required,
}) {
  const [selectChange, setSelectChange] = useState(value);
  return (
    <div
      className="form-group cms-form-group cms-form-group-select"
      style={{ width: "48%" }}
    >
      <label className="form-label">{label}</label>
      <select
        className="form-control"
        name={name}
        {...register(name, required && { required: "This field is required!" })}
        onChange={(e) => {
          setSelectChange(e.target.value);
        }}
        value={selectChange}
      >
        <option value="">Select an option</option>
        {options?.map((option, i) => (
          <option key={i} value={option.replaceAll(" ", "_").toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-danger">{error[name]?.message}</p>}
    </div>
  );
}

export default Select;
