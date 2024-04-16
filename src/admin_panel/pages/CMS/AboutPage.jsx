import { useEffect, useState } from "react";
import sendRequest, {
  successToast,
} from "../../../utility-functions/apiManager";
import AboutForm1 from "../../components/common/AboutForm1";
import { useForm } from "react-hook-form";
import BASE_URL from "../../../utility-functions/config";
import Lightbox from "yet-another-react-lightbox";
import CMSTable from "../../components/common/CMSTable/CMSTable";
import CMSForm2 from "../../components/common/CMSForm2";
import CMSForm3 from "../../components/common/CMSForm3";
import CMSTable2 from "../../components/common/CMSTable/CMSTable2";
import { Modal } from "react-bootstrap";
import CMSEditForm from "../../components/common/CMSEditForm";

function AboutPage() {
  const [sectionOne, setSectionOne] = useState(null);
  const [sectionTwo, setSectionTwo] = useState(null);
  const [sectionThree, setSectionThree] = useState(null);
  const [sectionFour, setSectionFour] = useState(null);
  const [open, setOpen] = useState(false);
  const [carImagesOpen, setCarImagesOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [sectionType, setSectionType] = useState(null);
  const [docId, setDocId] = useState(null);
  const [editValues, setEditValues] = useState(null);
  const [noImage, setNoImage] = useState(false);

  const {
    register: sectionOneRegister,
    formState: { errors: sectionOneError },
    handleSubmit: handleSectionOneSubmit,
    reset: sectionOneReset,
  } = useForm();

  const {
    register: sectionTwoRegister,
    formState: { errors: sectionTwoError },
    handleSubmit: handleSectionTwoSubmit,
    reset: sectionTwoReset,
  } = useForm();

  const {
    register: sectionThreeRegister,
    formState: { errors: sectionThreeError },
    handleSubmit: handleSectionThreeSubmit,
    reset: sectionThreeReset,
  } = useForm();

  const {
    register: editRegister,
    formState: { errors: editError },
    handleSubmit: handleEditSubmit,
    reset: editReset,
  } = useForm();

  useEffect(() => {
    sendRequest("get", "getSection/one").then((res) => {
      if (res.status) {
        setSectionOne(res.section[0]);
        console.log("res", res.section[0]);
      }
    });

    sendRequest("get", "getSection/two").then((res) => {
      if (res.status) {
        setSectionTwo(res.section);
        console.log("res", res.section);
      }
    });

    sendRequest("get", "getSection/three").then((res) => {
      if (res.status) {
        setSectionThree(res.section);
        console.log("res", res.section);
      }
    });

    sendRequest("get", "getSection/four").then((res) => {
      if (res.status) {
        setSectionFour(res.section);
        console.log("res", res.section);
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
        sendRequest("get", "getSection/one").then((res) => {
          if (res.status) {
            setSectionOne(res.section[0]);
            console.log("res", res.section[0]);
          }
        });
      }
    );
  };

  const onSectionTwoThreeSubmit = (data, e) => {
    const target = e.target.getAttribute("data");
    console.log("target", target);
    console.log("data", data);
    const formData = new FormData();
    data.file && formData.append("image", data.file[0]);
    data.heading && formData.append("text3", data.heading);
    data.title && formData.append("text1", data.title);
    data.description && formData.append("text2", data.description);
    data.textAlign && formData.append("textAlign", data.textAlign);

    sendRequest(
      "post",
      target == "two" || target == "four"
        ? `section/${target}`
        : "sectionThree",
      formData,
      "formData",
      "admin"
    ).then((res) => {
      if (res.status) {
        console.log(res);
        sendRequest("get", `getSection/${target}`).then((res) => {
          if (res.status) {
            switch (target) {
              case "two": {
                setSectionTwo(res.section);
                break;
              }
              case "three": {
                setSectionThree(res.section);
                break;
              }
              case "four": {
                setSectionFour(res.section);
                break;
              }
            }
            console.log("res", res.section);
          }
        });
      }
    });
  };

  const onSectionDelete = (e) => {
    const id = e.target.closest(".table-row").getAttribute("data");
    const section = e.target.closest(".table-row").getAttribute("data-section");
    console.log("target", id);
    console.log("section", section);
    if (confirm("Do you want to delete this?")) {
      sendRequest(
        "delete",
        `deleteSection/${section}`,
        { id },
        undefined,
        "admin"
      ).then((res) => {
        if (res.status) {
          sendRequest("get", `getSection/${section}`).then((res) => {
            if (res.status) {
              switch (section) {
                case "two": {
                  setSectionTwo(res.section);
                  break;
                }
                case "four": {
                  setSectionFour(res.section);
                  break;
                }
              }

              console.log("res", res.section);
            }
          });
        }
      });
    }
  };

  const onEditClick = (e) => {
    const section = e.target.closest(".table-row").getAttribute("data-section");
    const id = e.target.closest(".table-row").getAttribute("data");
    setSectionType(section);
    setDocId(id);
    if (section == "four") {
      setNoImage(true);
    } else {
      setNoImage(false);
    }
    setEditModalIsOpen(true);
  };
  const onEditSubmit = (data) => {
    console.log("data", data);
    const formData = new FormData();
    data.file?.length > 0 && formData.append("image", data.file[0]);
    data.textOne && formData.append("text1", data.textOne);
    data.textTwo && formData.append("text2", data.textTwo);
    data.textAlign && formData.append("textAlign", data.textAlign);
    formData.append("id", docId);

    console.log("formData", formData);
    sendRequest(
      "put",
      `section/${sectionType}`,
      formData,
      "formData",
      "admin"
    ).then((res) => {
      if (res.status) {
        successToast(res.section);
        setEditModalIsOpen(false);
        sendRequest("get", `getSection/${sectionType}`).then((res) => {
          if (res.status) {
            switch (sectionType) {
              case "two": {
                setSectionTwo(res.section);
                break;
              }
              case "four": {
                setSectionFour(res.section);
                break;
              }
            }
          }
        });
      }
    });
  };

  return (
    <div className="container">
      <h3 className="mb-4 text-center">About Page Content</h3>
      <section className="half-section">
        <h5 style={{ textDecoration: "underline" }}>Section One:</h5>
        <div className="w-100">
          <div
            style={{
              margin: "0 auto",
              width: "max-content",
              marginBottom: "20px",
            }}
          >
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
          <div
            style={{
              margin: "0 auto",
              width: "max-content",
              marginBottom: "20px",
            }}
          >
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
          <div
            className="w-25"
            style={{
              margin: "0 auto",
              marginBottom: "20px",
            }}
          >
            <label>Title</label>
            <h5 style={{ border: "1px solid #000", width: "100%" }}>
              {sectionOne?.title}
            </h5>
          </div>
          <div
            className="w-25"
            style={{
              margin: "0 auto",
              marginBottom: "20px",
            }}
          >
            <label>Description</label>
            <p style={{ border: "1px solid #000", width: "100%" }}>
              {sectionOne?.description}
            </p>
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
      <section className="half-section">
        <h5 style={{ textDecoration: "underline" }}>Section Two:</h5>
        <CMSTable
          data={sectionTwo}
          section={"two"}
          handleDeleteClick={onSectionDelete}
          handleEditClick={onEditClick}
          editValues={setEditValues}
          action={true}
        />
        <CMSForm2
          handleSubmit={handleSectionTwoSubmit}
          register={sectionTwoRegister}
          onSubmit={onSectionTwoThreeSubmit}
          reset={sectionTwoReset}
          error={sectionTwoError}
          section={"two"}
          single={false}
          data={sectionTwo}
          required={true}
          three={false}
        />
      </section>
      <section className="half-section">
        <h5 style={{ textDecoration: "underline" }}>Section Three:</h5>
        <CMSTable
          data={sectionThree}
          section={"three"}
          handleDeleteClick={onSectionDelete}
          three={true}
          action={false}
        />
        <CMSForm2
          handleSubmit={handleSectionThreeSubmit}
          register={sectionThreeRegister}
          onSubmit={onSectionTwoThreeSubmit}
          reset={sectionThreeReset}
          error={sectionThreeError}
          section={"three"}
          single={false}
          data={sectionThree}
          required={false}
          three={true}
        />
      </section>
      <section className="half-section">
        <h5 style={{ textDecoration: "underline" }}>Section Four:</h5>
        <CMSTable2
          data={sectionFour}
          section={"four"}
          handleDeleteClick={onSectionDelete}
          handleEditClick={onEditClick}
          editValues={setEditValues}
          three={true}
          action={true}
        />
        {sectionFour?.length < 3 && (
          <CMSForm3
            handleSubmit={handleSectionThreeSubmit}
            register={sectionThreeRegister}
            onSubmit={onSectionTwoThreeSubmit}
            reset={sectionThreeReset}
            error={sectionThreeError}
            section={"four"}
            single={false}
            data={sectionFour}
            required={true}
            three={true}
          />
        )}
      </section>

      {/*Edit modal*/}
      <>
        <Modal
          size="lg"
          className="category-modal"
          centered
          show={editModalIsOpen}
          onHide={() => {
            editReset();
            setEditModalIsOpen(false);
          }}
          style={{ zIndex: "9999", padding: 0 }}
        >
          <Modal.Header style={{ border: "none" }} closeButton>
            <h5>Edit</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="container">
                {/*Sliders*/}
                <section className="half-section">
                  <CMSEditForm
                    handleSubmit={handleEditSubmit}
                    onSubmit={onEditSubmit}
                    reset={editReset}
                    error={editError}
                    register={editRegister}
                    section={sectionType}
                    // single={single}
                    noImage={noImage}
                    values={editValues}
                  />
                </section>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default AboutPage;
