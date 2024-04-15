import { useEffect, useState } from "react";
import sendRequest, {
  successToast,
} from "../../../utility-functions/apiManager";
import AboutForm1 from "../../components/common/AboutForm1";
import { useForm } from "react-hook-form";
import BASE_URL from "../../../utility-functions/config";
import Lightbox from "yet-another-react-lightbox";

function AboutPage() {
  const [sectionOne, setSectionOne] = useState(null);
  const [open, setOpen] = useState(false);
  const [carImagesOpen, setCarImagesOpen] = useState(false);
  const {
    register: sectionOneRegister,
    formState: { error: sectionOneError },
    handleSubmit: handleSectionOneSubmit,
    reset: sectionOneReset,
  } = useForm();

  useEffect(() => {
    sendRequest("get", "getSetionOne").then((res) => {
      if (res.status) {
        setSectionOne(res.sectionOne[0]);
        console.log("res", res.sectionOne[0]);
      }
    });
  }, []);

  const onSubmit = (data) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    Object.values(data.carouselImages).map((image) => {
      formData.append("carouselImages", image);
    });
    data.title && formData.append("title", data.title);
    data.description && formData.append("description", data.description);

    sendRequest("post", "sectionOne", formData, "formData", "admin").then(
      (res) => {
        successToast(res.sectionOne);
        sendRequest("get", "getSetionOne").then((res) => {
          if (res.status) {
            setSectionOne(res.sectionOne[0]);
            console.log("res", res.sectionOne[0]);
          }
        });
      }
    );
  };
  return (
    <div className="container">
      <section className="half-section">
        <h5 style={{ textDecoration: "underline" }}>Section One:</h5>
        <div className="w-100">
          <div
            className="d-flex align-items-center justify-content-around"
            style={{ marginBottom: "30px" }}
          >
            <div>
              <label>Image</label>
              <img
                style={{
                  width: "300px",
                  height: "150px",
                  border: "1px solid #000",
                  objectFit: "cover",
                }}
                className="cursor-pointer"
                src={`${BASE_URL}/${sectionOne?.image}`}
                onClick={() => setOpen(true)}
              />
              <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: BASE_URL + "/" + sectionOne?.image }]}
              />
            </div>
            <div>
              <label>Carousel Image</label>
              <img
                style={{
                  width: "300px",
                  height: "150px",
                  border: "1px solid #000",
                  objectFit: "cover",
                }}
                src={`${BASE_URL}/${sectionOne?.carouselImages[0]}`}
                className="cursor-pointer"
                onClick={() => setCarImagesOpen(true)}
              />
              <Lightbox
                open={carImagesOpen}
                close={() => setCarImagesOpen(false)}
                slides={sectionOne?.carouselImages.map((img) => {
                  return { src: BASE_URL + "/" + img };
                })}
              />
            </div>
          </div>
          <div className="d-flex align-items-baseline justify-content-around">
            <div className="w-25">
              <label>Title</label>
              <h5 style={{ border: "1px solid #000", width: "100%" }}>
                {sectionOne?.title}
              </h5>
            </div>
            <div className="w-25">
              <label>Description</label>
              <p style={{ border: "1px solid #000", width: "100%" }}>
                {sectionOne?.description}
              </p>
            </div>
          </div>
        </div>
        <AboutForm1
          handleSubmit={handleSectionOneSubmit}
          onSubmit={onSubmit}
          reset={sectionOneReset}
          error={sectionOneError}
          register={sectionOneRegister}
          data={sectionOne}
        />
      </section>
      <section className="half-section"></section>
      <section className="half-section"></section>
    </div>
  );
}

export default AboutPage;
