import React, { useState } from "react";
import { Nav, Container, Form, Row, Col, Modal } from "react-bootstrap";
import TalkCmo from "../Images/Itnew11.webp";
import "../Styles/Modal.css";
import "../Styles/Content.css";
import newss from "../Images/itsw.gif";
import { API_ROOT } from "../apiConfig";

export function Subscribe() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [whitespaceError, setWhitespaceError] = useState(false); // Track whitespace error
  const [policyText, setPolicyText] = useState(
    "*By clicking on the Submit button, you are agreeing with the Privacy Policy with ITSecurity Wire."
  );
  const [userTyping, setUserTyping] = useState(""); // Track what the user is typing

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("email :", email);
  const handleEmailChange = (e) => {
    const emailInput = e.target.value;

    // Check for leading or trailing spaces and store the result in the state
    if (/\s/.test(emailInput)) {
      setWhitespaceError(true); // Set whitespace error state if spaces are detected
    } else {
      setWhitespaceError(false); // Reset error if there are no spaces
    }

    setEmail(emailInput); // Set email state
  };
  const validateEmail = () => {
    // Validate the email format (you can add more validation if needed)
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValidEmail(isValid);
    return isValid;
  };

  const handleEmailBlur = () => {
    validateEmail();
  };

  const resetForm = () => {
    setEmail("");
    setIsValidEmail(true);
    setWhitespaceError(false); // Reset whitespace error state
    setPolicyText(
      "*By clicking on the Submit button, you are agreeing with the Privacy Policy with ITSecurity Wire."
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the email contains any spaces
    if (/\s/.test(email)) {
      setWhitespaceError(true); // Set whitespace error if there's any space in the email
      setIsValidEmail(false); // Invalidate email format
      setPolicyText("White spaces are not allowed in the email address ❌");
      return;
    }

    // If the email is valid and no spaces, proceed with submission
    if (validateEmail()) {
      try {
        const response = await fetch(`${API_ROOT}/api/subscribe/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          resetForm();
          setPolicyText("Thank you for subscribing ✅");

          setTimeout(() => {
            resetForm();
          }, 5000);
        } else {
          if (response.status === 404) {
            setPolicyText("This email is already subscribed ❌");
          }
        }
      } catch (error) {
        console.error("Error sending subscription request:", error);
      }
    } else {
      setPolicyText("Please enter a valid email address ❌");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Nav.Link className="pl-4 mt-0 DesktopResponsive">
        <button className="btn-sm" onClick={handleShow}>
          Subscribe
        </button>
      </Nav.Link>

      <Modal show={show} onHide={handleClose} className="subscribePopUp">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#000", border: "1px solid white" }}
        >
          <img src={TalkCmo} alt="TalkCMO Banner" className="subslogo" />
        </Modal.Header>
        <Container className="popupBack">
          <Row>
            <Col md={5} className="laptopmImgback">
              <img
                className="DesktopResponsive mt-1"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                src="https://enterprisetalk.com/static/media/silverlaptop.f1f016cdf7ed12c1cfe2.png"
                alt="Silver Laptop"
              />
            </Col>
            <Col md={7}>
              <div style={{ textAlign: "center" }}>
                <img
                  className="mt-1"
                  style={{
                    width: "60%",
                    borderRadius: "10px",
                  }}
                  src={newss}
                  alt="Newsletter Banner"
                />
              </div>
              <Form
                className="px-3"
                controlId="emailInput"
                onSubmit={handleSubmit}
              >
                <Form.Group
                  className="px-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="Email ID"
                    onBlur={handleEmailBlur}
                    autoComplete="off"
                    aria-label="email"
                    data-testid="TextInput"
                    className={`mt-2 py-3 ${
                      isValidEmail && !whitespaceError ? "" : "is-invalid"
                    }`}
                    value={email}
                    onChange={handleEmailChange}
                    onCut={handleChange}
                    onCopy={handleChange}
                    onPaste={handleChange}
                  />
                  <div
                    className="mt-3 px-2 fw-bold"
                    style={{ fontSize: "14px" }}
                  >
                    {policyText}
                  </div>

                  {/* Show error messages based on validation */}
                  {(whitespaceError || !isValidEmail) && (
                    <div className="invalid-feedback">
                      {whitespaceError
                        ? "White spaces are not allowed in the email address."
                        : "Please enter a valid email address."}
                    </div>
                  )}
                </Form.Group>

                <Modal.Footer className="start">
                  <button className="SubBtn" type="submit">
                    Submit
                  </button>
                </Modal.Footer>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal>
    </div>
  );
}
