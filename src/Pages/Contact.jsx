import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "../Styles/Connect.css";
import { API_ROOT } from "../apiConfig";

const Contact = () => {
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
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;

    if (isEmailValid(value)) {
      setEmailError("");
    } else {
      setEmailError("Please provide a valid email.");
    }

    handleInputChange(e);
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
      if (form.checkValidity() === false || emailError) {
        e.stopPropagation();
        setValidated(true); // Trigger custom validation UI
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
    <div className="container container-max mb-4">
      <div className="row">
        <div className="col-md-8">
          <div className="borderB mt-4 mb-4">
            <p>
              <span class="label1 h5 fw-bold pinkColor "></span>
            </p>
          </div>
          <div className="row">
            <div className="col-md-6 mt-2">
              <Card style={{ marginRight: "10px" }} className="box-Card1">
                <Card className="p-md-3 cardHover" style={{ fontSize: "14px" }}>
                  <div id="future"></div>
                  <Card.Title
                    className="fw-bold"
                    style={{ cursor: "context-menu" }}
                  >
                    United Kingdom
                  </Card.Title>

                  <Card.Text className="fw-bold ">
                    40 Bloomsbury Way, Lower Ground Floor, London, WC1A 2SE
                  </Card.Text>
                </Card>
              </Card>
            </div>

            <div className="col-md-6 mt-2">
              <Card style={{ marginRight: "10px" }} className="box-Card1">
                <Card className="p-md-3 cardHover" style={{ fontSize: "14px" }}>
                  <div id="future"></div>
                  <Card.Title
                    className="fw-bold"
                    style={{ cursor: "context-menu" }}
                  >
                    India
                  </Card.Title>

                  <Card.Text className="fw-bold ">
                    Unit No. 779, 7th Floor, Tower 2, World Trade Center,
                    Kharadi, Pune 411014.
                  </Card.Text>
                </Card>
              </Card>
            </div>

            <div className="col-md-6 mt-2">
              <Card style={{ marginRight: "10px" }} className="box-Card1">
                <Card className="p-md-3 cardHover" style={{ fontSize: "14px" }}>
                  <div id="future"></div>
                  <Card.Title
                    className="fw-bold"
                    style={{ cursor: "context-menu" }}
                  >
                    Philippines
                  </Card.Title>

                  <Card.Text className="fw-bold ">
                    Prestige Tower, Penthouse II, F.Ortigas Jr. Rd., Pasig City,
                    Philippines
                  </Card.Text>
                </Card>
              </Card>
            </div>

            <div className="col-md-6 mt-2">
              <Card style={{ marginRight: "10px" }} className="box-Card1">
                <Card className="p-md-3 cardHover" style={{ fontSize: "14px" }}>
                  <div id="future"></div>
                  <Card.Title
                    className="fw-bold"
                    style={{ cursor: "context-menu" }}
                  >
                    United States of America
                  </Card.Title>

                  <Card.Text className="fw-bold ">
                    1611 E 2nd St. Suite #137, Casper, WY 82601 United States of
                    America
                  </Card.Text>
                </Card>
              </Card>
            </div>

            <div className="col-md-6 mt-2">
              <Card style={{ marginRight: "10px" }} className="box-Card1">
                <Card className="p-md-3 cardHover" style={{ fontSize: "14px" }}>
                  <div id="future"></div>
                  <Card.Title
                    className="fw-bold"
                    style={{ cursor: "context-menu" }}
                  >
                    Singapore
                  </Card.Title>

                  <Card.Text className="fw-bold ">
                    1 Raffles Place, #44-01A One Raffles Place Singapore. 048616
                  </Card.Text>
                </Card>
              </Card>
            </div>

            <div className="col-md-6 mt-2">
              <Card style={{ marginRight: "10px" }} className="box-Card1">
                <Card className="p-md-3 cardHover" style={{ fontSize: "14px" }}>
                  <div id="future"></div>
                  <Card.Title
                    className="fw-bold"
                    style={{ cursor: "context-menu" }}
                  >
                    Costa Rica
                  </Card.Title>

                  <Card.Text className="fw-bold ">
                    5th Floor, Creaciones Santos, Sabana, San Jose, Costa Rica
                  </Card.Text>
                </Card>
              </Card>
            </div>
          </div>

          <div className="emailBox">
            <div className="col-md-4 ">
              <div className="borderB mt-4 mb-4">
                <h1 className="fw-bold h5 pinkColor">Email Us</h1>
              </div>

              <div>
                <a
                  className="text-black fw-bold"
                  href="mailto: media@itsecuritywire.com"
                >
                  Media@ITSecurityWire.com
                </a>
              </div>
              <div className="mt-3">
                <a
                  className="text-black fw-bold"
                  href="mailto: sales@itsecuritywire.com"
                >
                  Sales@ITSecurityWire.com
                </a>
              </div>
            </div>

            <div className="col-md-4 ">
              <div className="borderB mt-4 mb-4">
                <h2 className="fw-bold h5 pinkColor">CCPA Helpline</h2>
              </div>

              <div>
                <a className="text-black fw-bold" href="tel:+18005462816">
                  1800-546-2816
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className=" mt-4 mb-4">
            <h3 className="fw-bold pinkColor h5 borderB">Send Us a Message</h3>
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

            <Button
              type="submit"
              className="SubBtn mt-2 mb-3"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
            <p className="successmsg">{successMessage}</p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
