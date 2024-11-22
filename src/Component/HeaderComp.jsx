import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import DropComp from "./LatestData/DropComp";
import "../Styles/Navbar.css";

function HeaderComp() {
  const [openData, setOpenData] = useState(null);
  const dropdownRef = useRef(null);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenData(null);
    }
  };

  useEffect(() => {
    if (openData) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openData]);

  const toggleData = (data) => {
    setOpenData((prevData) => (prevData === data ? null : data));
  };

  return (
    <>
      <div className="main-header">
        <ul className="bothsidenav borderB">
          <li
            className="hover-underline-animation high-light"
            onClick={() => toggleData("Latest")}
          >
            Latest<span className="smalltraingle"> &#x25BC;</span>
            {!isLargeScreen && openData === "Latest" && (
              <div className="mobile-dropdown open" ref={dropdownRef}>
                <DropComp
                  section="Latest"
                  maxItems={1}
                  className="mobile-screen"
                  handleSectionClick={toggleData}
                />
              </div>
            )}
          </li>
          <li
            className="hover-underline-animation  high-light"
            onClick={() => toggleData("Leadership")}
          >
            Leadership<span className="smalltraingle"> &#x25BC;</span>
            {!isLargeScreen && openData === "Leadership" && (
              <div className="mobile-dropdown open" ref={dropdownRef}>
                <DropComp
                  section="Leadership"
                  maxItems={1}
                  className="mobile-screen"
                  handleSectionClick={toggleData}
                />
              </div>
            )}
          </li>
          <li
            className="hover-underline-animation"
            onClick={() => toggleData("Features")}
          >
            Features<span className="smalltraingle"> &#x25BC;</span>
            {!isLargeScreen && openData === "Features" && (
              <div className="mobile-dropdown open" ref={dropdownRef}>
                <DropComp
                  section="Features"
                  maxItems={1}
                  className="mobile-screen"
                  handleSectionClick={toggleData}
                />
              </div>
            )}
          </li>
          <li className="hover-underline-animation hoverHead">
            {" "}
            <a
              className="a-tag hoverHead"
              href="https://resources.itsecuritywire.com/"
            >
              Resources
            </a>
          </li>

          {/* Krishna */}
          <li className="hover-underline-animation hoverHead">
            {" "}
            <a className="a-tag hoverHead" href="/events">
              Events
            </a>
          </li>

          {/* Krishna */}
          <li className="hover-underline-animation hoverHead">
            <a className="a-tag hoverHead" href="/contact-us">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      {isLargeScreen && openData && (
        <div ref={dropdownRef} className="large-screen">
          <DropComp
            section={openData}
            maxItems={3}
            handleSectionClick={toggleData}
          />
        </div>
      )}
    </>
  );
}

export default React.memo(HeaderComp);
