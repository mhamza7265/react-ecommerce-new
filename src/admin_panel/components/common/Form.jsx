function Form({ children, handleSubmit, onSubmit }) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "80%", margin: "auto" }}
    >
      {children}
    </form>
  );
}

export default Form;
