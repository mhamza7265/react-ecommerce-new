import { useState } from "react";
import ButtonMedium from "./ButtonMedium";
import FileTypeInput from "./FileTypeInput";
import Form from "./Form";
import Input from "./Input";
import Select from "./Select";

function CMSForm({ handleSubmit, onSubmit, reset, error, register }) {
  const [displayFields, setDisplayFields] = useState(false);
  const handleSumbitClick = () => {
    if (!Object.keys(error).length > 0) {
      setTimeout(() => {
        setDisplayFields(false);
        reset();
      }, 1000);
    } else {
      setDisplayFields(true);
    }
  };

  return (
    <div
      style={{
        border: "1px dashed #000",
        margin: "25px 66px",
        borderRadius: "15px",
      }}
    >
      <div className="d-flex justify-content-center my-3">
        <ButtonMedium
          name={"ADD NEW"}
          onClick={() => setDisplayFields(true)}
          className={displayFields && "d-none"}
        />
      </div>
      {displayFields && (
        <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
          <FileTypeInput register={register} name="file" multiple={false} />
          <div className="d-flex justify-content-between">
            <Input
              label="Text One"
              name="textOne"
              type="text"
              register={register}
              error={error}
            />
            <Input
              label="Text Two"
              name="textTwo"
              type="text"
              register={register}
              error={error}
            />
          </div>
          <Select
            name="textAlign"
            register={register}
            label="Select Text Alignment"
            options={["Left", "Center", "Right"]}
            error={error}
          />

          <ButtonMedium
            name="Submit"
            type="submit"
            onClick={handleSumbitClick}
          />
        </Form>
      )}
    </div>
  );
}

export default CMSForm;
