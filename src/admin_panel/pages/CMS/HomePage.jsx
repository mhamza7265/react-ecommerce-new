import { useForm } from "react-hook-form";
import CMSForm from "../../components/common/CMSForm";
import CMSTable from "../../components/common/CMSTable/CMSTable";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CMSEditForm from "../../components/common/CMSEditForm";

function HomePage() {
  const [sliders, setSliders] = useState(null);
  const [banners, setBanners] = useState(null);
  const [bestselling, setBestselling] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [sectionType, setSectionType] = useState(null);
  const [single, setSingle] = useState(false);
  const [docId, setDocId] = useState(null);
  const [editValues, setEditValues] = useState(null);

  const {
    register: registerSliderNew,
    reset: resetSliderNew,
    formState: { errors: errorsSliderNew },
    handleSubmit: handleSliderSubmit,
  } = useForm();

  const {
    register: registerEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
    handleSubmit: handleEditSubmit,
  } = useForm();

  const {
    register: registerBannerNew,
    reset: resetBannerNew,
    formState: { errors: errorsBannerNew },
    handleSubmit: handleBannerSubmit,
  } = useForm();

  const {
    register: registerBestsellNew,
    reset: resetBestsellNew,
    formState: { errors: errorsBestsellNew },
    handleSubmit: handleBestsellSubmit,
  } = useForm();

  useEffect(() => {
    sendRequest("get", "getHomePage/sliders").then((res) => {
      setSliders(res.homePage);
    });

    sendRequest("get", "getHomePage/banners").then((res) => {
      setBanners(res.homePage);
    });

    sendRequest("get", "getHomePage/bestSelling").then((res) => {
      setBestselling(res.homePage);
    });
  }, []);

  const onSubmit = (data, e) => {
    console.log("data", data);
    const target = e.target.getAttribute("data");
    const formData = new FormData();
    formData.append("text1", data.textOne);
    formData.append("text2", data.textTwo);
    formData.append("textAlign", data.textAlign);
    formData.append("image", data.file[0]);

    sendRequest("post", `addHomePage/${target}`, formData, "formData", "admin")
      .then((res) => {
        console.log(res);
        if (res.status) {
          successToast(
            `${
              target != "bestSelling"
                ? target.replace(/.$/, "").toLowerCase()
                : target.toLowerCase()
            } added`
          );
          sendRequest("get", `getHomePage/${target}`)
            .then((res) => {
              switch (target) {
                case "sliders": {
                  setSliders(res.homePage);
                  break;
                }
                case "banners": {
                  setBanners(res.homePage);
                  break;
                }
                case "bestSelling": {
                  setBestselling(res.homePage);
                  break;
                }
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (e) => {
    const id = e.target.closest(".table-row").getAttribute("data");
    const target = e.target.closest(".table-row").getAttribute("data-section");
    switch (target) {
      case "sliders": {
        setSingle(false);
        break;
      }
      case "banners": {
        setSingle(true);
        break;
      }
      case "bestSelling": {
        setSingle(true);
        break;
      }
    }
    setSectionType(target);
    setDocId(id);
    setEditModalIsOpen(true);
  };

  const handleDelete = (e) => {
    const id = e.target.closest(".table-row").getAttribute("data");
    const target = e.target.closest(".table-row").getAttribute("data-section");
    if (confirm("Do you want to delete this?")) {
      sendRequest(
        "delete",
        `deleteHomePage/${target}`,
        { id },
        undefined,
        "admin"
      )
        .then((res) => {
          console.log(res);
          if (res.status) {
            successToast(res.deleted);
            sendRequest("get", `getHomePage/${target}`)
              .then((res) => {
                console.log("sliders", res);
                switch (target) {
                  case "sliders": {
                    setSliders(res.homePage);
                    break;
                  }
                  case "banners": {
                    setBanners(res.homePage);
                    break;
                  }
                  case "bestSelling": {
                    setBestselling(res.homePage);
                    break;
                  }
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          console.log(err);
          errorToast(err);
        });
    } else {
      null;
    }
  };

  const onEditSubmit = (data) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("text1", data.textOne);
    formData.append("text2", data.textTwo);
    formData.append("textAlign", data.textAlign);
    formData.append("image", data.file[0]);
    formData.append("id", docId);
    sendRequest(
      "put",
      `editHomePage/${sectionType}`,
      formData,
      "formData",
      "admin"
    ).then((res) => {
      setEditModalIsOpen(false);
      resetEdit();
      if (res.status) {
        successToast(
          `${
            sectionType != "bestSelling"
              ? sectionType.replace(/.$/, "").toLowerCase()
              : sectionType.toLowerCase()
          } updated!`
        );
      }
      sendRequest("get", `getHomePage/${sectionType}`).then((res) => {
        if (res.status) {
          switch (sectionType) {
            case "sliders": {
              setSliders(res.homePage);
              break;
            }
            case "banners": {
              setBanners(res.homePage);
              break;
            }
            case "bestSelling": {
              setBestselling(res.homePage);
              break;
            }
          }
        }
      });
    });
  };

  return (
    <>
      <div className="container">
        <h3 className="mb-4 text-center">Home Page Content</h3>
        {/*Sliders*/}
        <section className="half-section">
          <h5 style={{ textDecoration: "underline" }}>Sliders:</h5>

          <CMSTable
            data={sliders}
            section={"sliders"}
            handleDeleteClick={handleDelete}
            handleEditClick={handleEdit}
            single={false}
            editValues={setEditValues}
            action={true}
          />
          <CMSForm
            handleSubmit={handleSliderSubmit}
            onSubmit={onSubmit}
            reset={resetSliderNew}
            error={errorsSliderNew}
            register={registerSliderNew}
            data={sliders}
            single={false}
            section={"sliders"}
            handleClick={setSectionType}
          />
        </section>
        {/*Banner*/}
        <section className="half-section">
          <h5 style={{ textDecoration: "underline" }}>Banners:</h5>

          <CMSTable
            data={banners}
            section={"banners"}
            handleDeleteClick={handleDelete}
            handleEditClick={handleEdit}
            single={true}
            editValues={setEditValues}
            action={true}
          />
          {banners?.length < 3 && (
            <CMSForm
              handleSubmit={handleBannerSubmit}
              onSubmit={onSubmit}
              reset={resetBannerNew}
              error={errorsBannerNew}
              register={registerBannerNew}
              single={true}
              data={banners}
              section={"banners"}
              handleClick={setSectionType}
            />
          )}
        </section>
        {/*Best selling*/}
        <section className="half-section" style={{ marginBottom: "40px" }}>
          <h5 style={{ textDecoration: "underline" }}>Best Selling:</h5>

          <CMSTable
            data={bestselling}
            section={"bestSelling"}
            handleDeleteClick={handleDelete}
            handleEditClick={handleEdit}
            single={true}
            editValues={setEditValues}
            action={true}
          />
          {bestselling?.length < 1 && (
            <CMSForm
              handleSubmit={handleBestsellSubmit}
              onSubmit={onSubmit}
              reset={resetBestsellNew}
              error={errorsBestsellNew}
              register={registerBestsellNew}
              single={true}
              data={bestselling}
              section={"bestSelling"}
              handleClick={setSectionType}
            />
          )}
        </section>
      </div>

      {/*Edit modal*/}
      <>
        <Modal
          size="lg"
          className="category-modal"
          centered
          show={editModalIsOpen}
          onHide={() => {
            resetEdit();
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
                    reset={resetEdit}
                    error={errorsEdit}
                    register={registerEdit}
                    section={sectionType}
                    single={single}
                    values={editValues}
                  />
                </section>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

export default HomePage;
