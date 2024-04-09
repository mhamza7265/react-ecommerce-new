function Input({ label, name, type, register, error }) {
  return (
    <div className="form-group cms-form-group" style={{ width: "48%" }}>
      <label className="form-label">{label}</label>
      <input
        {...register(name, { required: "This field is required!" })}
        name={name}
        className="form-control"
        type={type}
        autoComplete="email"
      />
      {error && <p className="text-danger">{error[name]?.message}</p>}
    </div>
  );
}

export default Input;
