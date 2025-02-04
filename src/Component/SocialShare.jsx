import React from "react";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { FaSquareXTwitter } from "react-icons/fa6";
import PropTypes from 'prop-types';

 function SocialShare({ title, url, img }) {
  const validUrl = url || "https://default.url";
  const validImg = img || "";

  return (
    <div style={{ gap: "5px", display: "flex" }}>
      <div className="share-button-container">
        <FacebookShareButton aria-label="Facebook" url={validUrl} quote={title}>
          <FacebookIcon size={27} />
        </FacebookShareButton>
      </div>

      <div className="share-button-container">
        <TwitterShareButton aria-label="Twitter" url={validUrl} title={title}>
          <TwitterIcon size={27} />
          {/* <FaSquareXTwitter size={30} /> */}
        </TwitterShareButton>
      </div>

      <div className="share-button-container">
        <LinkedinShareButton aria-label="Linkedin" url={validUrl} title={title} image={validImg}>
          <LinkedinIcon size={27} />
        </LinkedinShareButton>
      </div>
    </div>
  );
}

SocialShare.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  img: PropTypes.string,
};

export default SocialShare;