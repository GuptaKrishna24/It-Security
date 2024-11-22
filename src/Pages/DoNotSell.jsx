import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { API_ROOT } from "../apiConfig";

const Donotsell = () => {
  const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
    opt_in: false,
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({ ...initialFormData });
    setValidated(false);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
      } else {
        setLoading(true);

        const response = await fetch(`${API_ROOT}/api/contact/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // console.log("Data successfully submitted to the API.");
          setSuccessMessage("Thank you for your message. It has been sent.");
          setTimeout(() => {
            setSuccessMessage("");
          }, 8000);
          resetForm();
        } else {
          console.error("Failed to submit data to the API.");
        }
      }
    } catch (error) {
      console.error("Error while submitting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container container-max mb-5">
      <div className="row">
        <div className="col-md-12">
          <h5 className="fw-bold borderB">Opt-Out Form</h5>
          <div
            className="col-md-5"
            style={{ alignItems: "center", margin: "auto" }}
          >
            <div className=" mt-4 mb-4">
              <h3 className="fw-bold pinkColor text-center">
                Do Not Sell My Information
              </h3>
            </div>
            <Form
              noValidate
              validated={validated}
              className="border p-2"
              onSubmit={handleSubmit}
            >
              <Form.Group controlId="first_name">
                <Form.Control
                  type="name"
                  placeholder="First Name *"
                  className="mt-3"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  pattern="^(?!^[0-9]+$)(?!^[.,@]+$)[A-Za-z\d'.,@\s]*[A-Za-z\d'.,@]$"
                  // pattern="[A-Za-z\s]*"

                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid first name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="last_name">
                <Form.Control
                  type="text"
                  placeholder="Last Name *"
                  className="mt-3"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  pattern="^(?!^[0-9]+$)(?!^[.,@]+$)[A-Za-z\d'.,@\s]*[A-Za-z\d'.,@]$"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid last name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="Email">
                <Form.Control
                  type="email"
                  placeholder="name@example.com *"
                  className="mt-3"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  // pattern="/^(?!.*-@)(?!.*\.\.)(?!.*^\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g"
                  // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}^[^\s@]+@[^\s@]+\.[^\s@]+$"as
                  // pattern="[a-zA-Z0-9._%+-\.\.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Control
                  type="tel"
                  placeholder="Phone Number *"
                  className="mt-3"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  minLength={6}
                  maxLength={15}
                  pattern="^[0-9\+\-\(\).]+(?:\s?[0-9\+\-\(\).]+)*$"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="Message">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Message"
                  className="mt-3"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="opt_in">
                <Form.Check
                  className="mt-3 mb-1 checkfeedback"
                  type="checkbox"
                  id="agreementCheckbox"
                  label="By checking this box, I agree that ITSecurity Wire can contact me by email or phone and provide more information about the services. *"
                  name="opt_in"
                  checked={formData.opt_in}
                  onChange={handleInputChange}
                  feedback="Acknowledgment is required !"
                  feedbackType="invalid"
                  required
                />
              </Form.Group>

              <button
                type="submit"
                className="SubBtn mt-2 mb-3"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <p className="successmsg">{successMessage}</p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donotsell;
