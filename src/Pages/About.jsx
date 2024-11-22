import React from "react";
import "../Styles/About.css";
import SecurityLogo from "../Images/ITSecuritywire.webp";

const About = () => {
  return (
    <>
      <div className="container container-max">
        <div className="row">
          <h1 className="fw-bold h2 py-1 mt-3 borderB">About Us</h1>
          <div className="col-md-8">
            <h2 className="fw-bold h4 mt-3">
              An invaluable resource for all your IT Security Wire initiatives
              and assets.
            </h2>
            <p className="mt-3">
              Knowledge sharing platform for all IT Security Wire needs and
              plans. Peer to peer conversations that leverage industry experts
              and leaders for ideas, opinions and business insights.
            </p>
          </div>
          <div className="col-md-4 AboutLogo">
            <img
              style={{ width: "70%" }}
              className="m-auto"
              src={SecurityLogo}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="container container-max mt-5">
        <div className="row">
          <h3 className="fw-bold borderB py-1 h4">The Team</h3>
          <div className="col-md-12">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="card p-3" style={{}}>
                  <img
                    className=""
                    src="https://ondot.com/wp-content/uploads/elementor/thumbs/Kanika-Goswami-Editor-in-Chief--pyke832f3d4q4aygptiz8la0mujwak6ijhxkzfoev8.gif"
                    style={{ borderRadius: "10px" }}
                    alt=""
                  />
                  <div
                    className="p-md-3 colorRed card"
                    style={{ fontSize: "14px", padding: "10px" }}
                  >
                    <div id="future"></div>
                    <div className="fw-bold border-bottom card-title h5">
                      Kanika Goswami
                      <span>
                        <p className="mt-1" style={{ fontSize: "15px" }}>
                          Editor-in-Chief
                        </p>
                      </span>
                    </div>
                    <p className="cardText card-text">
                      Senior journalist with more than two decades in the media,
                      and a deep understanding of enterprise technology content.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card p-3" style={{}}>
                  <img
                    className=""
                    src="https://kgv.ae/wp-content/uploads/2023/03/Sameer-Datta-OnDot-jpg.webp"
                    style={{ borderRadius: "10px" }}
                    alt=""
                  />
                  <div
                    className="p-md-3 colorRed card"
                    style={{ fontSize: "14px", padding: "10px" }}
                  >
                    <div id="future"></div>
                    <div className="fw-bold border-bottom card-title h5">
                      Sameer Datta
                      <span>
                        <p className="mt-1" style={{ fontSize: "15px" }}>
                          Publisher
                        </p>
                      </span>
                    </div>
                    <p className="cardText card-text">
                      Worked for global brands for over 15 years, driving
                      business development, operations, and global media sales
                      and marketing teams.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card p-3" style={{}}>
                  <img
                    className=""
                    src="https://ondot.com/wp-content/uploads/elementor/thumbs/Kelly-Paice-VP-EMEA-pyke8409a760fwx3kbxlt31h88f9i9a8vml2gpn0p0.gif"
                    style={{ borderRadius: "10px" }}
                    alt=""
                  />
                  <div
                    className="p-md-3 colorRed card"
                    style={{ fontSize: "14px", padding: "10px" }}
                  >
                    <div id="future"></div>
                    <div className="fw-bold border-bottom card-title h5">
                      Kelly Paice
                      <span>
                        <p className="mt-1" style={{ fontSize: "15px" }}>
                          VP EMEA
                        </p>
                      </span>
                    </div>
                    <p className="cardText card-text">
                      Over fifteen years of expertise in eMedia as Head of
                      Client Delivery and Ziff Davis, Kelly brings deep
                      expertise in lead generation.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card p-3" style={{}}>
                  <img
                    className=""
                    src="https://ondot.com/wp-content/uploads/elementor/thumbs/Martin-Dela-Cruz%E2%80%8B-VP-APAC-pyke7zb2c0zktv3xbrwgym869b2ffrrl6zbn2btzk4.gif"
                    style={{ borderRadius: "10px" }}
                    alt=""
                  />
                  <div
                    className="p-md-3 colorRed card"
                    style={{ fontSize: "14px", padding: "10px" }}
                  >
                    <div id="future"></div>
                    <div className="fw-bold border-bottom card-title h5">
                      Martin Dela Cruz
                      <span>
                        <p className="mt-1" style={{ fontSize: "15px" }}>
                          VP APAC
                        </p>
                      </span>
                    </div>
                    <p className="cardText card-text">
                      Martin is an expert in building start-up businesses and
                      makes them visible in the arena. He has worked as
                      Operations Manager, Technical Support, Investor Relations
                      Executive, Pastry Chef, Recruiter, Author Partner, and
                      Director of Business Development.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card p-3" style={{}}>
                  <img
                    className=""
                    src="https://ondot.com/wp-content/uploads/elementor/thumbs/Eric-Yoshizuru-VP-AMER-pyke824kwj3fsoztvb4co3ik1goj2v2s7da3i5pt1g.gif"
                    style={{ borderRadius: "10px" }}
                    alt=""
                  />
                  <div
                    className="p-md-3 colorRed card"
                    style={{ fontSize: "14px", padding: "10px" }}
                  >
                    <div id="future"></div>
                    <div className="fw-bold border-bottom card-title h5">
                      Eric Yoshizuru
                      <span>
                        <p className="mt-1" style={{ fontSize: "15px" }}>
                          VP Americas
                        </p>
                      </span>
                    </div>
                    <p className="cardText card-text">
                      A Strategic Marketing Professional with 15+ years of
                      digital, product and corporate marketing experience in the
                      technology sector; Eric has proven ability to drive
                      measurable top and bottom line results by building
                      exceptional marketing teams and programs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card p-3" style={{}}>
                  <img
                    className=""
                    src="https://ondot.com/wp-content/uploads/elementor/thumbs/Pranab-Ghosh-Director-Marketing-OnDOt-pyke808wiv0v5h2k6ab3j3zmuoxsngvbj3z4jlsldw.gif"
                    style={{ borderRadius: "10px" }}
                    alt=""
                  />
                  <div
                    className="p-md-3 colorRed card"
                    style={{ fontSize: "14px", padding: "10px" }}
                  >
                    <div id="future"></div>
                    <div className="fw-bold border-bottom card-title h5">
                      Pranab Ghosh
                      <span>
                        <p className="mt-1" style={{ fontSize: "15px" }}>
                          Marketing Director
                        </p>
                      </span>
                    </div>
                    <p className="cardText card-text">
                      Pranab has a track record of working on complex projects
                      from scratch; scaling them up into multi-million dollar
                      businesses. At Ondot, he heads the marketing team and
                      strategizes for establishing the brand Ondot globally, as
                      a leader in B2B technology media marketing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(About);
