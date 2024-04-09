function ButtonMedium({ name, type, onClick, className }) {
  return (
    <button
      className={`btn btn-md btn-success ${className}`}
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default ButtonMedium;
