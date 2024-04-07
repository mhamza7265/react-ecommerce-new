function Input({ label, name, type, register }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        {...register(name)}
        name={name}
        className="form-control"
        type={type}
        autoComplete="email"
      />
    </div>
  );
}

export default Input;
