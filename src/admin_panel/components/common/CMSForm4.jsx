import { useState, useEffect } from "react";
import ButtonMedium from "./ButtonMedium";
import Form from "./Form";
import Input from "./Input";
import Select from "./Select";

function CMSForm4({
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

  const office = data?.find((item) => item.location == "office");
  const shop = data?.find((item) => item.location == "shop");
  const studio = data?.find((item) => item.location == "studio");

  let opt = [];

  !office && opt.push("office");
  !shop && opt.push("shop");
  !studio && opt.push("studio");

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
          <div className="d-flex justify-content-between">
            {!single && (
              <Input
                label="Address"
                name="address"
                type="text"
                register={register}
                error={error}
                required={required}
              />
            )}
            <Input
              label="Email"
              name="email"
              type="email"
              register={register}
              error={error}
              required={required}
            />
          </div>
          <div className="d-flex justify-content-between">
            <Input
              label="Contact No#"
              name="contact"
              type="text"
              register={register}
              error={error}
              required={required}
            />
            <Select
              name="location"
              register={register}
              label="Select Location"
              options={opt}
              error={error}
              required={required}
            />
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

export default CMSForm4;
