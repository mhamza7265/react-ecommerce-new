function ButtonSmall({ name, type }) {
  return (
    <>
      <button className="btn btn-sm btn-success" type={type}>
        {name}
      </button>
    </>
  );
}

export default ButtonSmall;
