import { useState } from "react";

function Input({ label, name, type, register, error, value, style, required }) {
  const [lengthError, setLengthError] = useState(false);
  const [inputVal, setInputVal] = useState(value);

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val.length < 40) {
      setInputVal(val);
    } else {
      setLengthError(true);
      setTimeout(() => {
        setLengthError(false);
      }, 2000);
    }
  };

  return (
    <div
      className="form-group cms-form-group"
      style={{ width: style?.width ?? "48%" }}
    >
      <label className="form-label">{label}</label>
      <input
        {...register(name, required && { required: "This field is required!" })}
        name={name}
        className="form-control"
        type={type}
        autoComplete="email"
        value={inputVal}
        onChange={handleInputChange}
      />
      {lengthError && <p className="text-danger">Max 40 letters allowed!</p>}
      {error && <p className="text-danger">{error[name]?.message}</p>}
    </div>
  );
}

export default Input;
