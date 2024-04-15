function ButtonMedium({ name, section, type, className, onClick }) {
  return (
    <button
      className={`btn btn-md btn-success ${className}`}
      type={type}
      data={section}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default ButtonMedium;
