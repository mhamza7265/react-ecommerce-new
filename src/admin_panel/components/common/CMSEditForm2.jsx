import { useState, useEffect } from "react";
import ButtonMedium from "./ButtonMedium";
import Form from "./Form";
import Input from "./Input";
import Select from "./Select";

function CMSEditForm2({
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
  values,
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
    <div style={{}} className="position-relative">
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
              value={values?.address}
            />
          )}
          <Input
            label="Email"
            name="email"
            type="email"
            register={register}
            error={error}
            required={required}
            value={values?.email}
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
            value={values?.contact}
          />
          <Select
            name="location"
            register={register}
            label="Select Location"
            options={opt}
            error={error}
            required={required}
            value={values?.location}
          />
        </div>
        <ButtonMedium
          name="Submit"
          section={section}
          type="submit"
          onClick={handleClick}
        />
      </Form>
    </div>
  );
}

export default CMSEditForm2;
