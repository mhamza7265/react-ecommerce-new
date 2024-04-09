import { useForm } from "react-hook-form";
import CMSForm from "../../components/common/CMSForm";
import CMSTable from "../../components/common/CMSTable/CMSTable";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function HomePage() {
  const [sliders, setSliders] = useState(null);
  const [banners, setBanners] = useState(null);
  const [bestselling, setBestselling] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const {
    register: registerSliderNew,
    reset: resetSliderNew,
    formState: { errors: errorsSliderNew },
    handleSubmit: handleSliderSubmit,
  } = useForm();

  const {
    register: registerSliderEdit,
    reset: resetSliderEdit,
    formState: { errors: errorsSliderEdit },
    handleSubmit: handleEditSliderSubmit,
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
    sendRequest("get", "sliders").then((res) => {
      console.log("sliders", res);
      setSliders(res.sliders);
    });

    sendRequest("get", "banners").then((res) => {
      console.log("banners", res);
      setBanners(res.banners);
    });

    sendRequest("get", "bestselling").then((res) => {
      console.log("bestsell", res);
      setBestselling(res.bestselling);
    });
  }, []);

  const onSliderSubmit = (data) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("text1", data.textOne);
    formData.append("text2", data.textTwo);
    formData.append("textAlign", data.textAlign);
    formData.append("image", data.file[0]);

    sendRequest("post", "addslider", formData, "formData", "admin")
      .then((res) => {
        console.log(res);
        if (res.status) {
          successToast("Slider added");
          sendRequest("get", "sliders")
            .then((res) => {
              console.log("slider", res);
              setSliders(res.sliders);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSliderEdit = (e, data) => {
    const id = e.target.closest(".table-row").getAttribute("data");
    console.log("id", id);
    console.log("data", data);
  };

  const handleSliderDelete = (e) => {
    const id = e.target.closest(".table-row").getAttribute("data");
    if (confirm("Do you want to delete this?")) {
      sendRequest("delete", "slider", { id }, undefined, "admin")
        .then((res) => {
          console.log(res);
          if (res.status) {
            successToast(res.deleted);
            sendRequest("get", "sliders")
              .then((res) => {
                console.log("sliders", res);
                setSliders(res.sliders);
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

  const onEditSubmit = (data) => {};

  //banner
  const handleBannerEdit = () => {};

  const handleBannerDelete = (e) => {
    const id = e.target.closest(".table-row").getAttribute("data");
    if (confirm("Do you want to delete this?")) {
      sendRequest("delete", "banner", { id }, undefined, "admin")
        .then((res) => {
          console.log(res);
          if (res.status) {
            successToast(res.deleted);
            sendRequest("get", "banners")
              .then((res) => {
                console.log("banners", res);
                setBanners(res.banners);
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

  const onBannerSubmit = (data) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("text1", data.textOne);
    formData.append("text2", data.textTwo);
    formData.append("textAlign", data.textAlign);
    formData.append("image", data.file[0]);

    sendRequest("post", "addBanner", formData, "formData", "admin")
      .then((res) => {
        console.log(res);
        if (res.status) {
          successToast("Banner added");
          sendRequest("get", "banners")
            .then((res) => {
              console.log("banners", res);
              setBanners(res.banners);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //bestsell
  const handleBestsellingEdit = () => {};

  const handleBestsellingDelete = (e) => {
    const id = e.target.closest(".table-row").getAttribute("data");
    if (confirm("Do you want to delete this?")) {
      sendRequest("delete", "bestselling", { id }, undefined, "admin")
        .then((res) => {
          console.log(res);
          if (res.status) {
            successToast(res.deleted);
            sendRequest("get", "bestselling")
              .then((res) => {
                console.log("bestselling", res);
                setBestselling(res.bestselling);
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

  const onBestsellSubmit = (data) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("text1", data.textOne);
    formData.append("text2", data.textTwo);
    formData.append("textAlign", data.textAlign);
    formData.append("image", data.file[0]);

    sendRequest("post", "addBestselling", formData, "formData", "admin")
      .then((res) => {
        console.log(res);
        if (res.status) {
          successToast("Image added");
          sendRequest("get", "bestselling")
            .then((res) => {
              console.log("bestselling", res);
              setBestselling(res.bestselling);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <h3 className="mb-4 text-center">Home Page Setting</h3>
        {/*Sliders*/}
        <section className="half-section">
          <h5 style={{ textDecoration: "underline" }}>Sliders:</h5>

          <CMSTable
            data={sliders}
            handleDeleteClick={handleSliderDelete}
            handleEditClick={handleSliderEdit}
          />
          <CMSForm
            handleSubmit={handleSliderSubmit}
            onSubmit={onSliderSubmit}
            reset={resetSliderNew}
            error={errorsSliderNew}
            register={registerSliderNew}
          />
        </section>
        {/*Banner*/}
        <section className="half-section">
          <h5 style={{ textDecoration: "underline" }}>Banner:</h5>

          <CMSTable
            data={banners}
            handleDeleteClick={handleBannerDelete}
            handleEditClick={handleBannerEdit}
          />
          {banners?.length < 3 && (
            <CMSForm
              handleSubmit={handleBannerSubmit}
              onSubmit={onBannerSubmit}
              reset={resetBannerNew}
              error={errorsBannerNew}
              register={registerBannerNew}
            />
          )}
        </section>
        {/*Best selling*/}
        <section
          className="half-section"
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          <h5 style={{ textDecoration: "underline" }}>Best Selling:</h5>

          <CMSTable
            data={bestselling}
            handleDeleteClick={handleBestsellingDelete}
            handleEditClick={handleBestsellingEdit}
          />
          {bestselling?.length < 1 && (
            <CMSForm
              handleSubmit={handleBestsellSubmit}
              onSubmit={onBestsellSubmit}
              reset={resetBestsellNew}
              error={errorsBestsellNew}
              register={registerBestsellNew}
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
            setEditModalIsOpen(false);
          }}
          style={{ zIndex: "9999", padding: 0 }}
        >
          <Modal.Header style={{ border: "none" }} closeButton>
            <h5>Edit Slider</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="container">
                {/*Sliders*/}
                <section className="half-section">
                  <CMSForm
                    handleSubmit={handleEditSliderSubmit}
                    onSubmit={onEditSubmit}
                    reset={resetSliderEdit}
                    error={errorsSliderEdit}
                    register={registerSliderEdit}
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
