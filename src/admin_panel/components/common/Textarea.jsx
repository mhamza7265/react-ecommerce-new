function Textarea({ name, register, label }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <textarea {...register(name)}></textarea>
    </div>
  );
}

export default Textarea;
