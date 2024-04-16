import { useState, useEffect } from "react";
import ButtonMedium from "./ButtonMedium";
import FileTypeInput from "./FileTypeInput";
import Form from "./Form";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";

function CMSForm2({
  handleSubmit,
  onSubmit,
  reset,
  error,
  register,
  data,
  single,
  section,
  handleClick,
  required,
  three,
}) {
  const [displayFields, setDisplayFields] = useState(false);

  useEffect(() => {
    setDisplayFields(false);
    reset();
  }, [data]);

  return (
    <div
      style={{
        border: "1px dashed #000",
        margin: "25px 66px 0 66px",
        borderRadius: "15px",
        backgroundColor: "#e8e9e8",
      }}
      className="position-relative"
    >
      {displayFields && (
        <i
          className="fa fa-times-circle-o text-white bg-danger cursor-pointer"
          style={{
            borderRadius: "50%",
            fontSize: "25px",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          onClick={() => setDisplayFields(false)}
        ></i>
      )}
      <div className="d-flex justify-content-center my-3">
        <ButtonMedium
          name={"ADD NEW"}
          onClick={() => setDisplayFields(true)}
          className={displayFields && "d-none"}
        />
      </div>
      {displayFields && (
        <Form handleSubmit={handleSubmit} onSubmit={onSubmit} section={section}>
          <FileTypeInput
            register={register}
            label={"Image"}
            name="file"
            multiple={false}
            error={error}
            required={required}
          />
          <div className="d-flex justify-content-between">
            {three && (
              <Input
                label="Heading"
                name="heading"
                type="text"
                register={register}
                error={error}
                required={required}
              />
            )}
            {!single && (
              <Input
                label="Title"
                name="title"
                type="text"
                register={register}
                error={error}
                required={required}
              />
            )}
          </div>
          <Textarea
            label="Description"
            name="description"
            type="text"
            register={register}
            error={error}
            required={required}
          />
          <Select
            name="textAlign"
            register={register}
            label="Select Text Alignment"
            options={["Left", "Center", "Right"]}
            error={error}
            required={required}
          />

          <ButtonMedium
            name="Submit"
            section={section}
            type="submit"
            onClick={handleClick}
          />
        </Form>
      )}
    </div>
  );
}

export default CMSForm2;
