import ButtonMedium from "./ButtonMedium";
import FileTypeInput from "./FileTypeInput";
import Form from "./Form";
import Input from "./Input";
import Select from "./Select";

function CMSEditForm({
  handleSubmit,
  onSubmit,
  section,
  register,
  error,
  single,
  handleClick,
  noImage,
  values,
}) {
  return (
    <Form handleSubmit={handleSubmit} onSubmit={onSubmit} section={section}>
      {!noImage && (
        <FileTypeInput register={register} name="file" multiple={false} />
      )}
      <div className="d-flex justify-content-between">
        <Input
          label="Text One"
          name="textOne"
          type="text"
          register={register}
          error={error}
          value={values.text1}
        />

        {!single && (
          <Input
            label="Text Two"
            name="textTwo"
            type="text"
            register={register}
            error={error}
            value={values.text2}
          />
        )}
      </div>
      <Select
        name="textAlign"
        register={register}
        label="Select Text Alignment"
        options={["Left", "Center", "Right"]}
        error={error}
        value={values.align}
      />

      <ButtonMedium
        name="Submit"
        section={section}
        type="submit"
        onClick={handleClick}
      />
    </Form>
  );
}

export default CMSEditForm;
