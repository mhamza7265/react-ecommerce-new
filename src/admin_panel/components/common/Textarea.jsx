function Textarea({ name, register, label }) {
  return (
    <div className="form-group cms-form-group">
      <label className="form-label">{label}</label>
      <textarea className="form-control" {...register(name)}></textarea>
    </div>
  );
}

export default Textarea;
