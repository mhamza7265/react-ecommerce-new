function Textarea({ name, register, label, error, required }) {
  return (
    <div className="form-group cms-form-group">
      <label className="form-label">{label}</label>
      <textarea
        className="form-control"
        {...register(name, required && { required: "This field is required" })}
      ></textarea>
      {error && <p className="text-danger">{error[name]?.message}</p>}
    </div>
  );
}

export default Textarea;
