import { Modal, Button } from "react-bootstrap";
import React from "react";
import "../modal.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const basicSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status  is required")
});

const Add = ({ showModal, hideModal, getadd }) => {
  const history = useNavigate();
  const onSubmit = async (values, actions) => {
    addIssue(values);
  };

  const { values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit, submitForm } = useFormik({
      initialValues: {
        title: "",
        description: '',
        status: "",
      },
      validationSchema: basicSchema,
      onSubmit
    })


  const notifySuccess = () => toast.success('Issue Added.', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const notifyError = (message = 'Something went wrong ...') => toast.error(message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const addIssue = async (e) => {

    try {

      const bodyFormData = new FormData();
      for (let value in values) {
        bodyFormData.append(value, values[value]);
      }
      const responce = await axios.post("/issues", bodyFormData).then(res => {

        history("/issues");
        hideModal();
        getadd();
        notifySuccess();

      })
        .catch(err => {
          const msg = err.response ? err.response.data.msg : "Something went wrong";
          notifyError(msg);
        });



    } catch (error) {
      const msg = error.response ? error.response.data.msg : "Something went wrong";
      notifyError(msg);

    }
  };

  return (


    <form onSubmit={handleSubmit} autoComplete="off" >
      <Modal
        style={{ marginTop: "60px" }}
        show={showModal}
        onHide={hideModal}
        backdrop={false}
        contentClassName="custom-modal-style"
      >

        <Modal.Header closeButton>
          <Modal.Title>Add Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body
        >

          <div class="row" >
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
                      className={errors.title && touched.title ? "form-control input-error" : "form-control "}

                    />
                    {errors.title && touched.title && <p className="error">{errors.title}</p>}

                  </div>

                  <div class="form-group">
                    <label for="inputName">Description</label>
                    <input
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.description && touched.description ? "form-control input-error" : "form-control "}

                    />
                    {errors.description && touched.description && <p className="error">{errors.description}</p>}

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
                      className={errors.status && touched.status ? "form-control input-error" : "form-control "}

                    >
                      <option selected>
                        Select Status
                      </option>

                      <option value="open">open</option>
                      <option value="in-progres">In Progress</option>
                      <option value="closed">Closed</option>

                    </select>
                    {errors.status && touched.status && <p className="error">{errors.status}</p>}

                  </div>



                </div>
              </div>
            </div>



          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>

          <button disabled={isSubmitting} onClick={submitForm} className="btn btn-success" type="submit">
            Submit
          </button>

        </Modal.Footer>

      </Modal>
    </form>

  );
};

export default Add;
