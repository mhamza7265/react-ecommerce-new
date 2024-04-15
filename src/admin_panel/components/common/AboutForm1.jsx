import { useEffect, useState } from "react";
import ButtonMedium from "./ButtonMedium";
import Form from "./Form";
import FileTypeInput from "./FileTypeInput";
import Input from "./Input";
import Textarea from "./Textarea";

function AboutForm1({
  handleSubmit,
  onSubmit,
  reset,
  error,
  register,
  data,
  single,
  section,
  handleClick,
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
          <div className="d-flex align-items-center">
            <FileTypeInput
              register={register}
              name="image"
              multiple={false}
              label={"Image"}
            />
            <FileTypeInput
              register={register}
              name="carouselImages"
              multiple={true}
              label={"Carousel Images"}
            />
          </div>
          <div className="input">
            <Input
              label="Title"
              name="title"
              type="text"
              register={register}
              error={error}
              required={false}
            />
            {!single && (
              <Textarea
                label="Description"
                name="description"
                type="text"
                register={register}
                error={error}
              />
            )}
          </div>

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

export default AboutForm1;
