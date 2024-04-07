function ButtonLarge({ name, type }) {
  return (
    <button className="btn btn-lg btn-success" type={type}>
      {name}
    </button>
  );
}

export default ButtonLarge;
