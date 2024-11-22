import React, { useState } from "react";

import facebook from "../Images/facebook-f.webp";
import instagram from "../Images/instagram.webp";
import linkedin from "../Images/linkedin.webp";
import twitter from "../Images/whiteTwitter.webp";
import abcIT from "../Images/Itnew11.webp";
import abcMartech from "../Images/abcMartech.webp";
import abcDev from "../Images/DevNew.webp";
import abcFin from "../Images/FintechNew.webp";
import abcEt from "../Images/abcET.webp";
import "../Styles/Modal.css";
import { Container, Form, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import TalkCmo from "../Images/TalkCmocroped.webp";
import "../Styles/Content.css";
import newss from "../Images/itsw.gif";
import newlogo from "../Images/Itnew11.webp";
import "../Styles/Footer.css";
import { API_ROOT } from "../apiConfig";
import facebook1 from "../Images/icons/facebook-icon.png";
import instagram1 from "../Images/icons/instagram-icon.png";
import linkedin1 from "../Images/icons/linkedin-icon.png";
import twitter1 from "../Images/icons/twitter-icon.png";

export function FooterComp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [policyText, setPolicyText] = useState(
    "*By clicking on the Submit button, you are agreeing with the Privacy Policy with IT Security."
  );

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);
    return isValid;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail();
  };

  const handleEmailBlur = () => {
    validateEmail(email);
  };

  const resetForm = () => {
    setEmail("");
    setIsValidEmail(true);
    setPolicyText(
      "*By clicking on the Submit button, you are agreeing with the Privacy Policy with ITSecurity Wire."
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
          // console.log("Subscription successful");
          resetForm();
          setPolicyText("Thank you for subscribing ✅");

          setTimeout(() => {
            resetForm();
          }, 5000);
        } else {
          console.error("Subscription failed");

          if (response.status === 404) {
            setPolicyText("This email is already subscribed ❌");
          }
        }
      } catch (error) {
        console.error("Error sending subscription request:", error);
      }
    } else {
      console.log("Invalid email");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <footer className="footerPadding text-white">
        <div className="container container-max">
          <div className="row text-white mt-2">
            <div className="col-md-3 col-12 mt-3">
              <source srcSet={newlogo} type="image/webp" />
              <img
                className="FootLogo"
                src={newlogo}
                srcSet={`${newlogo} 150w, ${newlogo}`}
                sizes="(max-width: 150px) 150px, 300px"
                alt="TalkCMO Logo"
                loading="lazy"
                width="150"
                height="60"
              />
              <div className="textdata">
                <p className="mt-3 just-text text-white">
                  An invaluable resource for all your IT Security Wire
                  initiatives and assets.
                </p>
                <p className="mt-3 just-text text-white">
                  Knowledge sharing platform for all IT Security Wire needs and
                  plans. Peer to peer conversations that leverage industry
                  experts and leaders for ideas, opinions and business insights.
                </p>
                <div className="mt-3">
                  <a
                    className="fw-bold  text-white mt-3 a-tag textbig"
                    href="mailto: media@itsecuritywire.com"
                  >
                    Media@ITSecurityWire.com
                  </a>
                </div>
                <div className="mt-3">
                  <a
                    className="fw-bold  text-white a-ta textbig"
                    href="mailto: sales@itsecuritywire.com"
                    style={{ textDecoration: 'none' }} >
                    Sales@ITSecurityWire.com
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-12 mt-3">
              <h6 className="h5 fw-bold textbig">About</h6>
              <a className="a-tag textbig" href="/about">
                <p className=" text-white mt-3 borderB textbig">About Us</p>
              </a>

              <a className="a-tag textbig" href="/contact-us">
                <p className=" text-white mt-3 borderB textbig">Contact Us</p>
              </a>

              <div className=" text-white mt-3 borderB">
                <p
                  className="text-white subclickbtn textbig"
                  onClick={handleShow}
                >
                  Subscribe
                </p>
              </div>

              <div className="subscribePopUp">
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header
                    closeButton
                    style={{
                      backgroundColor: "#000",
                      border: "1px solid #fff",
                    }}
                  >
                    <img
                      src={newlogo}
                      alt="Banner33"
                      className="subslogo"
                      srcSet={`${newlogo} 150w`}
                      sizes="150px"
                    />
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
                              type="email"
                              placeholder="Email ID"
                              onBlur={handleEmailBlur}
                              autoComplete="off"
                              aria-label="email"
                              data-testid="TextInput"
                              className={`mt-2 py-3 ${
                                isValidEmail ? "" : "is-invalid"
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

                            {!isValidEmail && (
                              <div className="invalid-feedback">
                                Please enter a valid email address.
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

              <a href="/sitemap" className="text-decoration-none a-tag textbig">
                {" "}
                <p className=" text-white mt-3 borderB textbig">
                  Sitemap
                </p>{" "}
              </a>
            </div>
            <div className="col-md-3 col-12 mt-3">
              <h6 className="h5 fw-bold">Policies</h6>

              <a className="a-tag textbig" href="/privacy-policy">
                <p className=" text-white mt-3 borderB textbig">
                  Privacy Policy
                </p>
              </a>

              <a className="a-tag textbig" href="/opt-out-form">
                <p className=" text-white mt-3 borderB textbig">
                  Do Not Sell My Information
                </p>
              </a>
            </div>
            <div className="col-md-3 col-12 mt-3 followPadding">
              <h6 className="h5 fw-bold">Follow us</h6>

              <div className="d-flex mt-2">
                <div className="socialWrapper">
                  <div className="socialCard">
                    <a href="https://www.facebook.com/ITSecWire">
                      <source srcSet={facebook1} type="image/webp" />
                      <img
                        className="socialIcon"
                        src={facebook1}
                        alt="facebook"
                        defer
                      />
                    </a>
                  </div>
                  <div className="socialCard">
                    <a href="https://www.instagram.com/enterprisetalk/">
                      <source srcSet={instagram1} type="image/webp" />
                      <img
                        className="socialIcon"
                        src={instagram1}
                        alt="instagram"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="socialCard">
                    <a href="https://x.com/ITSecurityWire">
                      <source srcSet={twitter1} type="image/webp" />
                      <img
                        className="socialIcon"
                        src={twitter1}
                        alt="twitter img"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="socialCard">
                    <a href="https://www.linkedin.com/company/itsecuritywire/">
                      <source srcSet={linkedin1} type="image/webp" />
                      <img
                        className="socialIcon"
                        src={linkedin1}
                        alt="linkedin"
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-3">
              <h6 className="text-center h5 fw-bold">Other Publications</h6>
            </div>

            <div className="justify-content-center text-center otherPublic">
              <>
              <a href="https://enterprisetalk.com/">
                  <img
                    className="imgPublica"
                    style={{ width: "140px" }}
                    src={abcEt}
                    srcSet={`${abcEt} 140w`}
                    sizes="140px"
                    alt="talkmar"
                    width="150"
                    height="35"
                    loading="lazy"
                  />
                </a>
              </>

              <>
              <a href="https://itsecurity.com/">
                  <img
                    className="imgPublicaEnter"
                    style={{
                      width: "130px",
                      height: "37px",
                      marginTop: "10px",
                    }}
                    src={abcIT}
                    srcSet={`${abcIT} 150w`}
                    sizes="150px"
                    alt="talkit"
                    width="150"
                    height="35"
                    loading="lazy"
                  />
                </a>
              </>

              <>
                <a href="https://talkfintech.com/">
                  <img
                    className="imgPublica"
                    style={{ width: "115px" }}
                    src={abcFin}
                    srcSet={`${abcFin} 150w`}
                    sizes="150px"
                    alt="talkfin"
                    width="150"
                    height="35"
                    loading="lazy"
                  />
                </a>
              </>
              <>
                <a href="https://talkmartech.com/">
                  <img
                    className="imgPublicaCMO"
                    style={{ width: "115px" }}
                    src={abcMartech}
                    srcSet={`${abcMartech} 150w`}
                    sizes="150px"
                    alt="talkcmo"
                    width="150"
                    height="35"
                    loading="lazy"
                  />
                </a>
              </>
              <>
                <a href="https://talkdev.com/">
                  <img
                    className="imgPublicadev"
                    style={{ width: "80px", marginTop: "10px" }}
                    src={abcDev}
                    srcSet={`${abcDev} 150w`}
                    sizes="150px"
                    alt="talkdev"
                    width="150"
                    height="35"
                    loading="lazy"
                  />
                </a>
              </>
            </div>

            <div className="borderT mt-3 mb-1">
              <p className="mt-2 text-white" style={{ fontSize: " 13px" }}>
                An Imprint of OnDot ® Media © | All Rights Reserved |{" "}
                <a
                  href="/privacy-policy"
                  style={{ color: "#fff" }}
                  className="text-decoration-none "
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
