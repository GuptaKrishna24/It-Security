import React, { useState, useEffect, useRef, useCallback } from "react";
import { useMediaQuery } from "react-responsive";

import TextCard from "../Component/TextCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Topic.css";
import SocialShare from "../Component/SocialShare";
import shareIcon from "../Images/shareIcon.webp";
import { CardComp } from "../Component/CardComp";
import axios from "axios";
import getYouTubeID from "get-youtube-id";
import { webPath, API_ROOT } from "../apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";

const Topic = () => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offsetTop = 400; // Adjust this value based on where you want the div to become fixed
      if (window.scrollY > offsetTop) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    console.log("data :", data);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollClick = (e) => {
    scrollToTop();
  };

  const moreFromTalkCMORef = useRef(null);
  const [showTableOfContents, setShowTableOfContents] = useState(true);
  const [className1, setClassName1] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowTableOfContents(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (moreFromTalkCMORef.current) {
      observer.observe(moreFromTalkCMORef.current);
    }

    return () => {
      if (moreFromTalkCMORef.current) {
        observer.unobserve(moreFromTalkCMORef.current);
      }
    };
  }, []);
  const [advertisementData, setAdvertisementData] = useState([]);

  useEffect(() => {
    const fetchAdvertisementData = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/api/advertisement/get_active`
        );
        setAdvertisementData(response.data);
      } catch (error) {
        console.error("Error fetching advertisement data:", error);
      }
    };

    fetchAdvertisementData();
  }, []);

  // eslint-disable-next-line
  const [ip, setIP] = useState("");

  const fetchIP = async () => {
    try {
      const response = await axios.get("https://api64.ipify.org?format=json");
      setIP(response.data.ip);
      // console.log(response.data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };

  useEffect(() => {
    fetchIP();
  }, []);
  const { cat_slug, post_name, auther_name } = useParams();
  const [accordionOpen, setAccordionOpen] = useState(false);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorId, setAuthorId] = useState("");
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [authorData, setAuthorData] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [activeHeadingId, setActiveHeadingId] = useState(null);
  // eslint-disable-next-line
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_ROOT}/api/author/${authorId}`);
        setAuthorData(response.data.result[0]);
      } catch (error) {
        console.error("Error fetching author data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  const RelatedData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_ROOT}/api/post/asidetopic/${cat_slug}`
      );
      const fetchedData = response?.data?.result;
      setRelatedData(fetchedData);
    } catch (err) {
      console.log("Error:", err);
    }
  }, [cat_slug]);
  useEffect(() => {
    RelatedData();
  }, [RelatedData]);

  const PostData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_ROOT}/api/post/latest`);
      const fetchedPost = response?.data;

      setPostData(fetchedPost);
      console.log("Fetched latest post data");
    } catch (err) {
      console.log("Error:", err);
    }
  }, []);

  useEffect(() => {
    PostData();
  }, [PostData]);

  console.log("data :", data);

  const fetchData = useCallback(async () => {
    try {
      const ipResponse = await axios.get("https://api64.ipify.org?format=json");

      if (ipResponse.status === 200) {
        const userIp = ipResponse.data.ip;

        const response = await axios.get(
          `${API_ROOT}/api/post/postdetails/${cat_slug}/${post_name}`
        );

        const dataPost = response.data.result[0];
        setData(dataPost);
        setHtmlContent(dataPost.post_content);
        setAuthorId(dataPost.post_author_id);

        const postDataForCount = {
          postId: dataPost?.id,
          ip_addr: userIp,
        };

        const countResponse = await axios.post(
          `${API_ROOT}/api/post/post_count/${dataPost.id}`,
          postDataForCount,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postDataForCount),
          }
        );

        if (countResponse.status !== 200) {
          throw new Error(`HTTP error! Status: ${countResponse.status}`);
        }
      } else {
        console.error("Error fetching IP address:", ipResponse.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 501) {
        navigate("/404");
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [cat_slug, post_name, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const sections = 5;
    let currentSection = 1;

    const setSectionClassName = () => {
      const removeTimer = setTimeout(() => {
        setClassName1("");
      }, 0);

      const setTimer = setTimeout(() => {
        setClassName1("loaded1");
        currentSection++;

        if (currentSection <= sections) {
          setSectionClassName();
        } else {
          window.removeEventListener("scroll", handleScroll);
        }
      }, currentSection * 70);

      return () => {
        clearTimeout(removeTimer);
        clearTimeout(setTimer);
      };
    };

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSectionClassName();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const container = document.createElement("div");
    container.innerHTML = htmlContent;

    let index = 1;
    let subIndex = 0;

    const headingsList = Array.from(
      container.querySelectorAll("h1, h2, h3, h4")
    ).map((heading, i) => {
      let text = heading.innerText;
      let id = heading.id || `heading-${i}`;

      if (heading.tagName === "H2") {
        text = (
          <span
            style={{ fontWeight: "600" }}
            className="hover-underline-animations hoverHead"
          >
            {index}. {text}
          </span>
        );
        index++;
        subIndex = 0; // Reset subindex for each new H2
      } else if (heading.tagName === "H3") {
        subIndex++;
        // text = `${index - 1}.${subIndex} ${text}`;
        text = (
          <span
            style={{ marginLeft: "20px", fontWeight: "500" }}
            className="hover-underline-animations hoverHead"
          >
            {index - 1}.{subIndex} {text}
          </span>
        );
      } else if (heading.tagName === "H4") {
        let subSubIndex = 0;
        subSubIndex++;
        text = (
          <span
            style={{ marginLeft: "40px", fontWeight: "400" }} // Adjusted styling for <h4>
            className="hover-underline-animations hoverHead"
          >
            {index - 1}.{subIndex}.{subSubIndex} {text}
            {/* Creates a three-level numbering like 1.2.1 */}
          </span>
        );
      }
      return {
        text: text,
        id: id,
      };
    });

    setHeadings(headingsList);
  }, [htmlContent]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // window.scrollBy(0, -130);
      setTimeout(() => {
        window.scrollBy(0, -120);
      }, 700);
    } else {
      console.log("Element not found with id:", id);
    }
  };

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const heading = tempDiv.querySelectorAll("h2, h3, h4");

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  heading.forEach((heading, index) => {
    heading.id = `heading-${index + 0}`;
  });

  const updatedHtmlContent = tempDiv.innerHTML;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const videoId = data?.podcast_link ? getYouTubeID(data?.podcast_link) : "";

  const handleHeaderClick = () => {
    setAccordionOpen(!accordionOpen);
  };

  // const canonicalUrl = `https://itsec.com/${cat_slug}/${post_name}`;

  // const schemaData = {
  //   "@context": "http://schema.org",
  //   "@type": "NewsArticle",
  //   headline: data?.post_title,
  //   description: data?.meta_description,
  //   datePublished: new Date(data?.post_date).toLocaleDateString(
  //     undefined,
  //     options
  //   ),
  //   dateModified: new Date(data?.post_date).toLocaleDateString(
  //     undefined,
  //     options
  //   ),
  //   author: {
  //     "@type": "Person",
  //     name: data?.post_author,
  //   },
  //   publisher: {
  //     "@type": "Organization",
  //     name: "IT Security Wire",
  //     logo: {
  //       "@type": "ImageObject",
  //       url: "https://itsec.com/static/media/TALKCMO%20LOGO.76e8265eb1c22cd870bb.webp",
  //     },
  //   },
  //   image: {
  //     "@type": "ImageObject",
  //     url: `${webPath}${data?.banner_img}`,
  //     height: "844 px",
  //     width: "1500 px",
  //   },
  //   articleBody: "Full text of the article",
  // };

  // const schemaData2 = {
  //   "@context": "http://schema.org",
  //   "@type": "CreativeWork",
  //   headline: data?.post_title,
  //   author: data?.post_author,
  //   datePublished: new Date(data?.post_date).toLocaleDateString(
  //     undefined,
  //     options
  //   ),
  //   description: data?.meta_description,
  // };

  // const schemaData3 = {
  //   "@context": "http://schema.org",
  //   "@type": "SocialMediaPosting",
  //   headline: data?.post_title,
  //   datePublished: new Date(data?.post_date).toLocaleDateString(
  //     undefined,
  //     options
  //   ),
  //   author: {
  //     "@type": "Person",
  //     name: data?.post_author,
  //   },
  //   publisher: {
  //     "@type": "Organization",
  //     name: "IT Security Wire",
  //     logo: {
  //       "@type": "ImageObject",
  //       url: "https://talkcmo.com/static/media/TALKCMO%20LOGO.76e8265eb1c22cd870bb.webp",
  //     },
  //   },
  //   mainEntityOfPage: {
  //     "@type": "WebPage",
  //     "@id": canonicalUrl,
  //   },
  // };

  // const schemaData4 = {
  //   "@context": "http://schema.org",
  //   "@type": "ImageObject",
  //   url: `${webPath}${data?.banner_img}`,
  //   caption: "",
  //   description: data?.meta_description,
  // };

  // let schemaData5;

  // if (data?.podcast_link) {
  //   schemaData5 = {
  //     "@context": "http://schema.org",
  //     "@type": "VideoObject",
  //     name: data?.post_title,
  //     description: data?.meta_description,
  //     duration: data?.reading_time,
  //     thumbnailUrl: `${webPath}${data?.banner_img}`,
  //     uploadDate: data?.post_date,
  //     contentUrl: data?.podcast_link,
  //     publisher: {
  //       "@type": "Organization",
  //       name: "IT Security Wire",
  //       logo: {
  //         "@type": "ImageObject",
  //         url: "https://talkcmo.com/static/media/TALKCMO%20LOGO.76e8265eb1c22cd870bb.webp",
  //       },
  //     },
  //   };
  // }

  // else {
  //   schemaData5 = null;
  // }

  const shareText = data?.post_title;

  // const shareUrl = `https://talkcmo.com/${cat_slug}/${post_name}`;

  const instagramShareUrl = `https://www.instagram.com/?caption=${encodeURIComponent(
    shareText
  )}`;

  const openSharePopup = (url) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleInstagramShare = () => {
    openSharePopup(instagramShareUrl);
  };

  const pageTitle =
    " ITSecurityWire | Leadership Insights | News | Views and Trends";

  return (
    <>
      <Helmet>
        {/* Krishna */}

        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Knowledge sharing platform for all IT security needs and plans. Peer to peer conversations that leverage industry experts and leaders for ideas, opinions and business insights."
        />
        <meta name="title" property="og:title" content={pageTitle} />
        <meta property="og:type" content="PostDetails" />
        <meta
          name="image"
          property="og:image"
          content="https://enterprisetalk.com/static/media/enterpriseLogo.0c9f185de2e44cf44932.webp"
        />
        <meta
          name="description"
          property="og:description"
          content="A Peer Knowledge Resource Expert inputs on challenges, triumphs &amp; innovative solutions from corporate Movers &amp; Shakers in global Leadership."
        />
      </Helmet>
      <div className="container mb-5 max-toc">
        <div className="row">
          <div className="col-md-9 borderR">
            <div className="paddings ">
              <h1 className="fw-bold mt-1 h2 ">{data?.post_title}</h1>

              <div
                style={{ lineHeight: "2" }}
                className="d-flex justify-content-between"
              >
                {data && (
                  <>
  <div>
  <p className="mt-1" style={{ fontSize: "13px", display: "flex", alignItems: "center" }}>
    By{" "}
    <a
      style={{ textDecoration: "none", marginLeft: "4px", marginRight: "4px" }}
      className="headerText"
      href={`/author/${data?.author_name}`}
    >
      <span className="fw-bold authorName">{data?.post_author}</span>
    </a>
    |{" "}
    <span style={{ marginLeft: "4px" }}>
      {new Date(data?.post_date).toLocaleDateString(undefined, options)}
    </span>
  </p>
</div>




                    <div className="d-flex gap-1">
                      <button className="share-btn mb-1">
                        <img
                          src={shareIcon}
                          alt="share"
                          width="30"
                          height="30"
                          style={{
                            width: "23px",
                            height: "auto",
                            padding: "1px",
                          }}
                        />
                      </button>
                      <SocialShare
                        url={data?.url}
                        title={data?.post_title}
                        img={`${webPath}${data?.banner_img}`}
                      />
                      <div className="share-button-container instabtn">
                        <button
                          onClick={handleInstagramShare}
                          className="instaBackColor"
                          style={{ border: "none", height: "27px" }}
                          aria-label="Instagram"
                        >
                          <FontAwesomeIcon
                            icon={faInstagram}
                            style={{
                              fontSize: "17px",
                              color: "#fff",
                              marginBottom: "2px",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {loading ? (
                isLargeScreen ? (
                  <div className="skeleton-wrapper">
                    <Skeleton width={850} height={450} />
                    <Skeleton
                      width={400}
                      height={200}
                      style={{ marginTop: "10px" }}
                    />
                    <Skeleton count={4} style={{ marginTop: "5px" }} />
                    <Skeleton count={4} style={{ marginTop: "5px" }} />
                  </div>
                ) : (
                  <div className="skeleton-wrapper">
                    <Skeleton width={350} height={180} />
                    <Skeleton
                      width={150}
                      height={180}
                      style={{ marginTop: "10px" }}
                    />
                    <Skeleton count={4} style={{ marginTop: "5px" }} />
                    <Skeleton count={4} style={{ marginTop: "5px" }} />
                  </div>
                )
              ) : (
                !data?.podcast_link &&
                data?.banner_img &&
                data?.banner_show === 1 && (
                  <div className="mt-3">
                    <img
                      className="topicImg"
                      src={`${webPath}${data?.banner_img}`}
                      alt={data?.post_name}
                      width="150"
                      height="100"
                      loading="lazy"
                    />
                  </div>
                )
              )}

              <div style={{ fontSize: "14px" }}>
                {headings.length > 0 && showTableOfContents && (
                  <div
                    sticky="top"
                    className={`contentTableBox mb-4 mt-3 ${
                      isFixed ? "newTOC" : ""
                    }`}
                    onClick={handleHeaderClick}
                  >
                    <h2 className="fw-bold px-1 h4 clippath">
                      <div className="d-flex justify-content-between">
                        <div className="mb-1" style={{ cursor: "pointer" }}>
                          Table of Contents
                        </div>
                        <div style={{ cursor: "pointer" }} className="px-2">
                          <FontAwesomeIcon icon={faBars} />
                        </div>
                      </div>
                    </h2>
                    <React.Fragment>
                      {accordionOpen && (
                        <ol
                          className="px-3"
                          style={{
                            overflowY: "scroll",
                            height: "100%",
                            maxHeight: "300px",
                          }}
                        >
                          {headings.map((heading, index) => (
                            <li key={heading.id} className="tocBack">
                              <a
                                href={`#${heading.id}`}
                                onClick={(e) => {
                                  scrollToHeading(heading.id);
                                  handleLinkClick(e);
                                  setActiveHeadingId(heading.id);
                                  setAccordionOpen(false);
                                }}
                                className={`text-black mb-1 backLine hover-underline-animations ${
                                  activeHeadingId === heading.id
                                    ? "actived"
                                    : ""
                                }`}
                              >
                                {heading.text}
                              </a>
                            </li>
                          ))}
                        </ol>
                      )}
                    </React.Fragment>
                  </div>
                )}

                {data?.podcast_link && (
                  <div className="video-responsive">
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div
                  className="content mt-2"
                  dangerouslySetInnerHTML={{ __html: updatedHtmlContent }}
                />
              </div>

              <LazyLoad className={className1}>
                <div
                  className="ArticleBox  mb-5"
                  style={{ alignItems: "center" }}
                >
                  <>
                    <div>
                      <img
                        className="ArticleImg"
                        src={`${webPath}${
                          authorData?.author_photo ||
                          "/uploads/author-profiles/Author-Image.jpg"
                        }?width=300`}
                        alt={authorData?.author_name}
                        width="150"
                        height="80"
                        loading="lazy"
                      />
                    </div>
                    <div style={{ fontSize: "14px", padding: "10px" }}>
                      <h2 className="fw-bold h6 ">
                        <a
                          style={{ textDecoration: "none" }}
                          className="headerText"
                          href={`/author/${data?.author_name}`}
                        >
                          {authorData?.author_display_name}
                        </a>
                      </h2>

                      <p>{authorData?.author_description}</p>
                    </div>
                  </>
                </div>
              </LazyLoad>
            </div>

            <LazyLoad className={className1}>
              <div className="mt-5">
                <h3 className="fw-bold borderB py-1 h4">
                  More from IT Security Wire
                </h3>

                {postData?.map((item, index) => (
                  <div
                    key={item?.id}
                    className="d-flex justify-content-evenly container gap-4"
                  >
                    <div className="row">
                      <div className="col-md-3 col-12 mt-3">
                        <a
                          className="a-tag"
                          href={`/${item?.cat_slug}/${item?.post_name}`}
                          onClick={handleScrollClick}
                        >
                          <CardComp
                            src={`${webPath}${item?.banner_img}?width=300`}
                            alt={item?.post_name}
                            cardImg="cardImg"
                          />
                        </a>
                      </div>
                      <div className="col-md-9 col-12 mt-3">
                        <a
                          className="a-tag"
                          href={`/${item?.cat_slug}/${item?.post_name}`}
                          onClick={handleScrollClick}
                        >
                          <TextCard
                            title={item?.post_title}
                            desc={item?.post_content}
                            post_author={item?.post_author}
                            post_date={item?.post_date}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </LazyLoad>
          </div>

          <div className="col-md-3 mobiletop">
            <div className=" borderB paddings">
              <h5 className="fw-bold">Related Content</h5>
            </div>
            <div>
              {relatedData
                ?.filter((x, i) => data?.post_title !== x.post_title)
                .slice(0, 4)
                ?.map((x, i) => (
                  <React.Fragment key={i}>
                    <div className="d-flex">
                      <a
                        className="a-tag mt-2"
                        href={`/${x?.cat_slug}/${x?.post_name}`}
                        onClick={handleScrollClick}
                      >
                        <TextCard
                          title={x?.post_title}
                          desc={x?.post_content}
                          post_author={x?.post_author}
                          post_date={x?.post_date}
                        />
                      </a>
                    </div>
                  </React.Fragment>
                ))}
            </div>

            <div className="mt-5">
              <div
                className="marTop heightAuto"
                style={{ textAlign: "center", height: "auto" }}
              >
                {advertisementData && advertisementData.length > 0 && (
                  <a
                    href={`${advertisementData[0]?.dest_url}`}
                    aria-label="Visit advertisement page"
                  >
                    <img
                      className="mt-5"
                      style={{ height: "auto", width: "100%" }}
                      src={`${webPath}${advertisementData[0]?.banner_img}?width=600`}
                      alt={advertisementData[0]?.banner_name}
                      aria-label={advertisementData[0]?.banner_name}
                      loading="lazy"
                      width="640"
                      height="360"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container container-max">
          <div className="row mt-5 spaceincontentbottm">
            <div className="col-md-12  borderB">
              <div>
                {advertisementData && advertisementData.length > 0 && (
                  <a href={`${advertisementData[2]?.dest_url}`}>
                    {" "}
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={`${webPath}${advertisementData[2]?.banner_img}`}
                      alt={advertisementData[2]?.banner_name}
                      aria-label={advertisementData[2]?.banner_name}
                      loading="lazy"
                      width="640"
                      height="360"
                    />{" "}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Topic);
