import ButtonMedium from "../../components/common/ButtonMedium";
import Form from "../../components/common/Form";
import Input from "../../components/common/Input";
import { useForm } from "react-hook-form";
import Textarea from "../../components/common/Textarea";
import FileTypeInput from "../../components/common/FileTypeInput";

function HomePage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
  };
  return (
    <>
      <div className="container">
        <h3 className="mb-4 text-center">Home Page Setting</h3>
        <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
          <Input
            label="Input"
            name="first_input"
            type="text"
            register={register}
          />
          <Textarea name={"textarea"} register={register} label="Textarea" />
          <FileTypeInput register={register} name="file" multiple={false} />
          <ButtonMedium name="Submit" type="submit" />
        </Form>
      </div>
    </>
  );
}

export default HomePage;
