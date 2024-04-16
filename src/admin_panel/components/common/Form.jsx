function Form({ children, handleSubmit, onSubmit, section, style }) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: style?.width ?? "90%",
        margin: "20px auto 40px auto",
      }}
      className="form"
      data={section}
    >
      {children}
    </form>
  );
}

export default Form;
