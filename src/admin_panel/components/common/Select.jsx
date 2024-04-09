function Select({ name, register, label, error, options, onChange }) {
  return (
    <div className="form-group cms-form-group" style={{ width: "48%" }}>
      <label className="form-label">{label}</label>
      <select
        className="form-control"
        name={name}
        {...register(name, { required: "This field is required!" })}
        onChange={onChange}
      >
        <option value="">Select an option</option>
        {options?.map((option, i) => (
          <option key={i} value={option.replaceAll(" ", "_").toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
      <p className="text-danger">{error[name]?.message}</p>
    </div>
  );
}

export default Select;
