import { useForm } from "react-hook-form";
import CMSTable2 from "../../components/common/CMSTable/CMSTable2";
import CMSForm3 from "../../components/common/CMSForm3";
import { useEffect, useState } from "react";
import sendRequest, {
  successToast,
} from "../../../utility-functions/apiManager";
import CMSForm4 from "../../components/common/CMSForm4";
import CMSTable3 from "../../components/common/CMSTable/CMSTable3";
import { Modal } from "react-bootstrap";
import CMSEditForm from "../../components/common/CMSEditForm";
import CMSEditForm2 from "../../components/common/CMSEditForm2";

function ContactPage() {
  const [sectionOne, setSectionOne] = useState(null);
  const [sectionTwo, setSectionTwo] = useState(null);
  const [editValues, setEditValues] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [edit2ModalIsOpen, setEdit2ModalIsOpen] = useState(false);
  const [sectionType, setSectionType] = useState(null);
  const [docId, setDocId] = useState(null);
  const [noImage, setNoImage] = useState(true);

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
    register: editRegister,
    formState: { errors: editError },
    handleSubmit: handleEditSubmit,
    reset: editReset,
  } = useForm();

  const {
    register: edit2Register,
    formState: { errors: edit2Error },
    handleSubmit: handleEdit2Submit,
    reset: edit2Reset,
  } = useForm();

  useEffect(() => {
    sendRequest("get", "getContactSection/one").then((res) => {
      if (res.status) {
        setSectionOne(res.section);
        console.log("section", res.section);
      }
    });

    sendRequest("get", "getContactSection/two").then((res) => {
      if (res.status) {
        setSectionTwo(res.section);
        console.log("section", res.section);
      }
    });
  }, []);

  const onSectionSubmit = (data, e) => {
    const target = e.target.closest(".form").getAttribute("data");
    let obj;

    if (target == "one") {
      obj = {
        text1: data.title,
        text2: data.description,
        textAlign: data.textAlign,
      };
    } else {
      obj = data;
    }

    sendRequest(
      "post",
      `contactSectionOne/${target}`,
      obj,
      undefined,
      "admin"
    ).then((res) => {
      if (res.status) {
        sendRequest("get", `getContactSection/${target}`).then((res) => {
          if (res.status) {
            switch (target) {
              case "one": {
                setSectionOne(res.section);
                break;
              }
              case "two": {
                setSectionTwo(res.section);
                break;
              }
            }
          }
        });
      }
    });
  };

  const onSectionDelete = (e) => {
    const section = e.target.closest(".table-row").getAttribute("data-section");
    const id = e.target.closest(".table-row").getAttribute("data");
    if (confirm("Do you want to delete this?")) {
      sendRequest(
        "delete",
        `contactSection/${section}`,
        { id },
        undefined,
        "admin"
      ).then((res) => {
        if (res.status) {
          sendRequest("get", `getContactSection/${section}`).then((res) => {
            if (res.status) {
              switch (section) {
                case "one": {
                  setSectionOne(res.section);
                  break;
                }
                case "two": {
                  setSectionTwo(res.section);
                  break;
                }
              }
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
    if (section == "one") {
      setEditModalIsOpen(true);
    } else {
      setEdit2ModalIsOpen(true);
    }
  };

  const onEditSubmit = (data) => {
    let obj;
    if (sectionType == "one") {
      obj = {
        text1: data.textOne,
        text2: data.textTwo,
        textAlign: data.textAlign,
        id: docId,
      };
    } else {
      obj = { ...data, id: docId };
    }

    sendRequest(
      "put",
      `contactSection/${sectionType}`,
      obj,
      undefined,
      "admin"
    ).then((res) => {
      setEdit2ModalIsOpen(false);
      setEditModalIsOpen(false);
      if (res.status) {
        successToast("Updated");
        sendRequest("get", `getContactSection/${sectionType}`).then((res) => {
          if (res.status) {
            switch (sectionType) {
              case "one": {
                setSectionOne(res.section);
                break;
              }
              case "two": {
                setSectionTwo(res.section);
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
      <h3 className="mb-4 text-center">Contact Page Content</h3>
      <section className="half-section">
        <h5 style={{ textDecoration: "underline" }}>Section One:</h5>
        <CMSTable2
          data={sectionOne}
          section={"one"}
          handleDeleteClick={onSectionDelete}
          handleEditClick={onEditClick}
          editValues={setEditValues}
          three={true}
          action={true}
        />
        {sectionOne?.length < 4 && (
          <CMSForm3
            handleSubmit={handleSectionOneSubmit}
            register={sectionOneRegister}
            onSubmit={onSectionSubmit}
            reset={sectionOneReset}
            error={sectionOneError}
            section={"one"}
            single={false}
            data={sectionOne}
            required={true}
            three={true}
          />
        )}
      </section>
      <section className="half-section">
        <h5 style={{ textDecoration: "underline" }}>Section Two:</h5>
        <CMSTable3
          data={sectionTwo}
          section={"two"}
          handleDeleteClick={onSectionDelete}
          handleEditClick={onEditClick}
          editValues={setEditValues}
          three={true}
          action={true}
        />
        {sectionTwo?.length < 3 && (
          <CMSForm4
            handleSubmit={handleSectionTwoSubmit}
            register={sectionTwoRegister}
            onSubmit={onSectionSubmit}
            reset={sectionTwoReset}
            error={sectionTwoError}
            section={"two"}
            single={false}
            data={sectionTwo}
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

      {/*Edit modal 2*/}
      <>
        <Modal
          size="lg"
          className="category-modal"
          centered
          show={edit2ModalIsOpen}
          onHide={() => {
            edit2Reset();
            setEdit2ModalIsOpen(false);
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
                  <CMSEditForm2
                    handleSubmit={handleEdit2Submit}
                    onSubmit={onEditSubmit}
                    reset={edit2Reset}
                    error={edit2Error}
                    register={edit2Register}
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

export default ContactPage;
