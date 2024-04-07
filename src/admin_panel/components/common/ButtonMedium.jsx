function ButtonMedium({ name, type }) {
  return (
    <button className="btn btn-md btn-success" type={type}>
      {name}
    </button>
  );
}

export default ButtonMedium;
