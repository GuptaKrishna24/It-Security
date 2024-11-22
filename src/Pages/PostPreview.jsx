import React, { useState, useEffect } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
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

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollClick = (e) => {
    scrollToTop();
  };
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
  const { cat_slug, post_name } = useParams();
  const [accordionOpen, setAccordionOpen] = useState(false);

  const [data, setData] = useState(
    null
  );
  const [loading, setLoading] = useState(true);
  const [authorId, setAuthorId] = useState("");
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [relatedData, setRelatedData] = useState(
     []
  );
  const [postData, setPostData] = useState(
    []
  );
  const [authorData, setAuthorData] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [activeHeadingId, setActiveHeadingId] = useState(null);
  // eslint-disable-next-line
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch related data when the component mounts
    RelatedData();

    // Set up an interval to fetch data every 10 seconds (adjust as needed)
    // const intervalId = setInterval(RelatedData, 10000); // 10 seconds

    // Cleanup function to clear the interval on unmount
    // return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    PostData();
    // Set up an interval to fetch data every 10 seconds (adjust as needed)
    // const intervalId = setInterval(PostData, 10000); // 10 seconds

    // Cleanup function to clear the interval on unmount
    // return () => clearInterval(intervalId);
  }, []);

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
      // Check if authorId is truthy
      fetchAuthorData();
    }
  }, [authorId]);

  const RelatedData = async () => {
    try {
      // Fetch data from the API
      const response = await axios.get(
        `${API_ROOT}/api/post/asidetopic/${cat_slug}`
      );
      const fetchedData = response?.data?.result;

      // Check local storage first
      setRelatedData(fetchedData);
      // const relatedLocal = localStorage.getItem("relatedArticle");

      // if (JSON.stringify(fetchedData) !== JSON.stringify(relatedLocal)) {
      //   localStorage.setItem("relatedArticle", JSON.stringify(fetchedData));
      // } else {
      //   // If the data is the same, use local storage
      //   setRelatedData(relatedLocal);
      // }

      // Optionally, update other states if needed
      // if (fetchedData && fetchedData.length > 0) {
      //   setHtmlContent(fetchedData[0]?.post_content); // Use the first fetched article for content
      //   setAuthorId(fetchedData[0]?.post_author_id); // Use the first fetched article for author ID
      // }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const PostData = async () => {
    try {
      const response = await axios.get(`${API_ROOT}/api/post/latest`);
      const fetchedPost = response?.data;
      setPostData(fetchedPost);
      // const postLocal = localStorage.getItem("postArticle");

      // if (JSON.stringify(fetchedPost) !== postLocal) {
      //   localStorage.setItem("postArticle", JSON.stringify(fetchedPost));
      // } else {
      //   setPostData(JSON.parse(postLocal));
      // }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's IP address from the ipify service
        const ipResponse = await axios.get(
          "https://api64.ipify.org?format=json"
        );

        if (ipResponse.status === 200) {
          const userIp = ipResponse.data.ip;

          // Fetch post details
          const response = await axios.get(
            `${API_ROOT}/api/post/preview-post/${cat_slug}/${post_name}`
          );

          const dataPost = response.data.result[0];
          setData(dataPost);
          setHtmlContent(dataPost.post_content);
          setAuthorId(dataPost.post_author_id);
          const postAuthor = localStorage.getItem("dataLocal");

          // if (JSON.stringify(dataPost) !== postAuthor) {
          //   localStorage.setItem("dataLocal", JSON.stringify(dataPost));
          // } else {
          //   setData(JSON.parse(postAuthor));
          //   setHtmlContent(dataPost.post_content);
          //   setAuthorId(dataPost.post_author_id);
          // }

          // Now, send data to another API endpoint including the user's IP
          const postDataForCount = {
            postId: dataPost.id,
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
          // Redirect to 404 Not Found page
          navigate("/404"); // Replace '/404' with the actual path to your 404 page
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cat_slug, post_name]);

  const [className1, setClassName1] = useState("");

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
      container.querySelectorAll("h1, h2, h3")
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
        window.scrollBy(0, -90);
      }, 700);
    } else {
      // console.log("Element not found with id:", id);
    }
  };

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  // Get all h1, h2, h3 elements
  const heading = tempDiv.querySelectorAll("h2, h3");

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  heading.forEach((heading, index) => {
    heading.id = `heading-${index + 0}`;
  });

  // Set the modified HTML content back
  const updatedHtmlContent = tempDiv.innerHTML;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const videoId = data?.podcast_link ? getYouTubeID(data.podcast_link) : "";

  const handleHeaderClick = () => {
    setAccordionOpen(!accordionOpen);
  };

  const canonicalUrl = `https://talkcmo.com/${cat_slug}/${post_name}`;

  const schemaData = {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    headline: data?.post_title,
    description: data?.meta_description,
    datePublished: new Date(data?.post_date).toLocaleDateString(
      undefined,
      options
    ),
    dateModified: new Date(data?.post_date).toLocaleDateString(
      undefined,
      options
    ),
    author: {
      "@type": "Person",
      name: data?.post_author,
    },
    publisher: {
      "@type": "Organization",
      name: "Talk cmo",
      logo: {
        "@type": "ImageObject",
        url: "https://talkcmo.com/static/media/Talkcmo.0d98293385406252f383.webp",
      },
    },
    image: {
      "@type": "ImageObject",
      url: `${webPath}${data?.banner_img}`,
      height: "844 px",
      width: "1500 px",
    },
    articleBody: "Full text of the article",
  };

  const schemaData2 = {
    "@context": "http://schema.org",
    "@type": "CreativeWork",
    headline: data?.post_title,
    author: data?.post_author,
    datePublished: new Date(data?.post_date).toLocaleDateString(
      undefined,
      options
    ),
    description: data?.meta_description,
  };

  const schemaData3 = {
    "@context": "http://schema.org",
    "@type": "SocialMediaPosting",
    headline: data?.post_title,
    datePublished: new Date(data?.post_date).toLocaleDateString(
      undefined,
      options
    ),
    author: {
      "@type": "Person",
      name: data?.post_author,
    },
    publisher: {
      "@type": "Organization",
      name: "Talk cmo",
      logo: {
        "@type": "ImageObject",
        url: "https://talkcmo.com/static/media/Talkcmo.0d98293385406252f383.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  const schemaData4 = {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    url: `${webPath}${data?.banner_img}`,
    caption: "",
    description: data?.meta_description,
  };

  let schemaData5;

  if (data?.podcast_link) {
    // Check if there is a video report link
    schemaData5 = {
      "@context": "http://schema.org",
      "@type": "VideoObject",
      name: data?.post_title,
      description: data?.meta_description,
      duration: data?.reading_time, // Replace with actual video duration
      thumbnailUrl: `${webPath}${data?.banner_img}`,
      uploadDate: data?.post_date,
      contentUrl: data?.podcast_link,
      publisher: {
        "@type": "Organization",
        name: "Talk cmo",
        logo: {
          "@type": "ImageObject",
          url: "https://talkcmo.com/static/media/Talkcmo.0d98293385406252f383.webp",
        },
      },
    };
  }

  // else {
  //   schemaData5 = null;
  // }

  const shareText = data?.post_title;

  const shareUrl = `https://talkcmo.com/${cat_slug}/${post_name}`;

  const instagramShareUrl = `https://www.instagram.com/?caption=${encodeURIComponent(
    shareText
  )}`;

  const openSharePopup = (url) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleInstagramShare = () => {
    openSharePopup(instagramShareUrl);
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData, null, 2)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(schemaData2, null, 2)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(schemaData3, null, 2)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(schemaData4, null, 2)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(schemaData5, null, 2)}
        </script>
      </Helmet>
      <div className="container mb-5 container-max">
        <div className="row">
          <div className="col-md-9 borderR">
            <div className="paddings ">
              <h1 className="fw-bold mt-1 h2 ">{data?.post_title}</h1>

              <div
                style={{ lineHeight: "2" }}
                className="d-flex justify-content-between"
              >
                <div>
                  <p className="mt-1" style={{ fontSize: "13px" }}>
                    By <span className="fw-bold">{data?.post_author}</span> |{" "}
                    {new Date(data?.post_date).toLocaleDateString(
                      undefined,
                      options
                    )}
                  </p>
                </div>
                <div className="d-flex gap-1">
                  <button className="share-btn mb-1">
                    <img
                      src={shareIcon}
                      alt="share"
                      width="30"
                      height="30"
                      style={{ width: "23px", height: "auto", padding: "1px" }}
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
              </div>

              {loading
                ? isLargeScreen && (
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
                  )
                : !data?.podcast_link && data?.banner_img && data?.banner_show === 1 && (
                
                    <div className="mt-3">
                      <img
                        className="topicImg"
                        src={`${data?.banner_img}`}
                        alt={data?.post_name}
                        width="150"
                        height="100"
                        loading="lazy"
                      />
                    </div>
                  )}

              <div style={{ fontSize: "14px", marginTop: "20px" }}>
                <p className="paddings">
                  {headings.length > 0 && (
                    <div
                      className="contentTableBox mb-4"
                      onClick={handleHeaderClick}
                    >
                      <h2 className="fw-bold px-1 h4 clippath">
                        <div className="d-flex justify-content-between ">
                          <div className="mb-1" style={{ cursor: "pointer" }}>
                            Table of Contents
                          </div>
                          <div style={{ cursor: "pointer" }} className="px-2">
                            <FontAwesomeIcon icon={faBars} />
                          </div>
                        </div>
                      </h2>
                      {accordionOpen && (
                        <ol className="px-3">
                          {headings.map((heading, index) => (
                            <li key={heading.id} className="tocBack ">
                              <a
                                href={`#${heading.id}`}
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent default anchor click behavior
                                  scrollToHeading(heading.id);
                                  handleLinkClick(e);
                                  setActiveHeadingId(heading.id); // Set active heading id when clicked
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
                    </div>
                  )}
                </p>

                {data?.podcast_link && (
                  <div className="video-responsive">
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </div>
                )}
                
              </div>

              <div
                className="content mt-2"
                dangerouslySetInnerHTML={{ __html: updatedHtmlContent }}
              ></div>



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
                    <h2 className="fw-bold h6">
                      {authorData?.author_display_name}
                    </h2>
                    <p>{authorData?.author_description}</p>
                    {/* <p
                            dangerouslySetInnerHTML={{
                              __html: authorData?.author_description,
                            }}
                          /> */}
                  </div>
                </>
              </div>
              </LazyLoad>



            </div>

            <div className=" mt-5">
              <h3 className="fw-bold borderB py-1 h4">
                More from Talk cmo
              </h3>

              {postData?.map((item, index) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-evenly container gap-4"
                >
                  <div className="row">
                    <div className="col-md-3 col-12 mt-3">
                      <CardComp
                        src={`${webPath}${item?.banner_img}?width=300`}
                        alt={item?.post_name}
                      />
                    </div>
                    <div className="col-md-9 col-12 mt-3">
                      <Link
                        className="a-tag"
                        to={`/${item?.cat_slug}/${item?.post_name}`}
                        onClick={handleScrollClick}
                      >
                        <TextCard
                          title={item?.post_title}
                          desc={item?.post_content}
                          post_author={item?.post_author}
                          post_date={item?.post_date}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-3 mobiletop">
            <div className=" borderB paddings">
              <h5 className="fw-bold">Related Articles</h5>
            </div>
            <div>
              {relatedData?.slice(0, 4)?.map((x, i) => (
                <React.Fragment key={i}>
                  <div className="d-flex">
                    <Link
                      className="a-tag"
                      to={`/${x.cat_slug}/${x.post_name}`}
                      onClick={handleScrollClick}
                    >
                      <TextCard
                        title={x?.post_title}
                        desc={x?.post_content}
                        post_author={x?.post_author}
                        post_date={x?.post_date}
                      />
                    </Link>
                    <div style={{ display: "flex", alignItems: "end" }}>
                      <span className="numb">{i + 1}</span>
                    </div>
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
                    href={`${advertisementData[0].dest_url}`}
                    aria-label="Visit advertisement page"
                  >
                    <img
                      className="mt-5"
                      style={{ height: "auto", width: "100%" }}
                      src={`${webPath}${advertisementData[0].banner_img}?width=600`}
                      alt={advertisementData[0].banner_name}
                      aria-label={advertisementData[0].banner_name}
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

        <div className="container container-max ">
          <div className="row mt-5 spaceincontentbottm">
            <div className="col-md-12  borderB">
              <div>
                {advertisementData && advertisementData.length > 0 && (
                  <a href={`${advertisementData[2].dest_url}`}>
                    {" "}
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={`${webPath}${advertisementData[2].banner_img}`}
                      alt={advertisementData[2].banner_name}
                      aria-label={advertisementData[2].banner_name}
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

export default Topic;