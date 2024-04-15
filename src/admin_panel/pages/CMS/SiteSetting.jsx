import Form from "../../components/common/Form";
import Input from "../../components/common/Input";
import ButtonSmall from "../../components/common/ButtonSmall";
import { useForm } from "react-hook-form";
import FileTypeInput from "../../components/common/FileTypeInput";
import sendRequest, {
  successToast,
} from "../../../utility-functions/apiManager";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BASE_URL from "../../../utility-functions/config";

function SiteSetting() {
  const [siteSettings, setSiteSettings] = useState(null);
  const {
    register: logoRegister,
    handleSubmit: handleLogoSubmit,
    formState: { error: logoError },
  } = useForm();

  const {
    register: titleRegister,
    handleSubmit: handleTitleSubmit,
    formState: { error: titleError },
  } = useForm();

  useEffect(() => {
    sendRequest("get", "settings").then((res) => {
      setSiteSettings(res.setting);
    });
  }, []);

  const onSubmit = (data) => {
    console.log("data", data);
    const formData = new FormData();
    data.image && formData.append("image", data.image[0]);
    data.title && formData.append("title", data.title);
    sendRequest("post", "settings", formData, "formData", "admin")
      .then((res) => {
        console.log("res", res);
        successToast("Succesful");
        sendRequest("get", "settings")
          .then((res) => {
            if (res.status) {
              setSiteSettings(res.setting);
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div className="container">
      <div className="half-section">
        <h5 style={{ textDecoration: "underline" }}>Logo Setting:</h5>
        <div
          style={{
            width: "max-content",
            margin: "0 auto",
            border: "1px solid #000",
          }}
        >
          <LazyLoadImage
            style={{ height: " 100px", width: "200px" }}
            src={`${BASE_URL}/${siteSettings?.image}`}
          />
        </div>
        <Form
          handleSubmit={handleLogoSubmit}
          onSubmit={onSubmit}
          section={"logo"}
          style={{ width: "40%" }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <FileTypeInput
              label={"Site Logo"}
              name={"image"}
              register={logoRegister}
              error={logoError}
            />
          </div>
          <ButtonSmall name={"Submit"} />
        </Form>
      </div>
      <div className="half-section">
        <h5 style={{ textDecoration: "underline" }}>Title Setting:</h5>

        <h5 className="text-center">
          Title:{" "}
          <span style={{ fontWeight: "bold", fontSize: "25px", color: "red" }}>
            {siteSettings?.title}
          </span>
        </h5>
        <Form
          handleSubmit={handleTitleSubmit}
          onSubmit={onSubmit}
          section={"logo"}
          style={{ width: "40%" }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Input
              label={"Site Title"}
              name={"title"}
              type={"text"}
              register={titleRegister}
              error={titleError}
              style={{ width: "350px" }}
            />
          </div>
          <ButtonSmall name={"Submit"} />
        </Form>
      </div>
    </div>
  );
}

export default SiteSetting;
