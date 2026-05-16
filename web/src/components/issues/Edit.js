import { Modal } from "react-bootstrap";
import React from "react";
import "../modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const basicSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description  is required"),
  status: Yup.string().required("Status  is required"),
});

const Edit = ({ showModal, hideModal, id, data, getedit }) => {
  const history = useNavigate();
  const onSubmit = async (values, actions) => {
    editIssue(values);
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
    submitForm,
  } = useFormik({
    initialValues: {
      title: data?.title || "",
      description: data?.description || "",
      status: data?.status || "",
    },
    enableReinitialize: true,
    validationSchema: basicSchema,
    onSubmit,
  });

  const notifySuccess = () =>
    toast.info("Issue info Updated.", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = () =>
    toast.error("Something went wrong ...", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const editIssue = async (e) => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("id", id);
      for (let value in values) {
        bodyFormData.append(value, values[value]);
      }
      const response = await axios
        .patch("/issues/" + id, bodyFormData)
        .then((res) => {
          history("/issues");
          hideModal();
          getedit();
          notifySuccess();
        })
        .catch((err) => {
          notifyError();
        });
    } catch (error) {
      notifyError();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      encType="multipart/form-data"
    >
      <Modal
        style={{ marginTop: "60px" }}
        show={showModal}
        onHide={hideModal}
        backdrop={false}
        contentClassName="custom-modal-style"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!data ? (
            <div style={{ padding: 12 }}>Loading…</div>
          ) : (
          <div class="row">
            <div class="col-md-6">
              <div class="card card-primary">
                <div class="card-body">
                  <div class="form-group">
                    <label for="inputName">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.title && touched.title
                          ? "form-control input-error"
                          : "form-control "
                      }
                    />
                    {errors.title && touched.title && (
                      <p className="error">{errors.title}</p>
                    )}
                  </div>

                  <div class="form-group">
                    <label for="inputName">Description</label>
                    <input
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.description && touched.description
                          ? "form-control input-error"
                          : "form-control "
                      }
                    />
                    {errors.description && touched.description && (
                      <p className="error">{errors.description}</p>
                    )}
                  </div>


                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card card-primary">
                <div class="card-body">


                  <div className="form-group">
                    <label for="inputStatus">Status</label>
                    <select
                      id="inputStatus"
                      class="form-control custom-select"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.status && touched.status
                          ? "form-control input-error"
                          : "form-control "
                      }
                    >
                      <option selected>Select Status</option>

                      <option value="open">open</option>
                      <option value="in-progres">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                    {errors.status && touched.status && (
                      <p className="error">{errors.status}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-error" onClick={hideModal}>
            Cancel
          </button>

          <button
            disabled={isSubmitting}
            onClick={submitForm}
            className="btn btn-success"
            type="submit"
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default Edit;
