import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useMediaQuery } from "react-responsive";

import TextCard from "../Component/TextCard";
import { Tab, Tabs, TabContent } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Topic.css";
import SocialShare from "../Component/SocialShare";
import shareIcon from "../Images/shareIcon.webp";
import axios from "axios";
import { webPath, API_ROOT } from "../apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";

const EventDetail = () => {
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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Ensures the page starts at the top
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
  const { cat_slug, post_name, event_slug } = useParams();
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("tab1");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eventSlug, setEentSlug] = useState("");
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [htmlContent, setHtmlContent] = useState("");
  const [popularData, setPopularData] = useState([]);
  const [latestData, setLatestData] = useState([]);
  // const [activeHeadingId, setActiveHeadingId] = useState(null);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState("");

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

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/api/post/homelatestnews`);
        setLatestData(response.data); // Set the response data
      } catch (error) {
        console.error("Error fetching latest news data:", error);
      }
    };

    const fetchPopularData = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/api/post/homepopular`);
        setPopularData(response.data); // Set the response data
      } catch (error) {
        console.error("Error fetching popular news data:", error);
      }
    };

    fetchLatestData();
    fetchPopularData();
  }, []); // Runs only on component mount

  // useEffect(() => {
  //   const fetchAllData = () => {
  //     fetchData(
  //       `${API_ROOT}/api/post/homelatestnews`,
  //       setLatestData,
  //       "latestData"
  //     );

  //     fetchData(
  //       `${API_ROOT}/api/post/homepopular`,
  //       setPopularData,
  //       "popularData"
  //     );
  //   };

  //   fetchAllData();
  // }, []);

  console.log("activeKey :", activeKey);

  console.log("relatedData :", relatedData);
  console.log("popularData :", popularData);

  const handleTabSelect = useCallback((key) => {
    setActiveKey(key);
  }, []);

  const displayedData = useMemo(
    () => (activeKey === "tab1" ? latestData : popularData),
    [activeKey, latestData, popularData]
  );

  console.log("displayedData :", displayedData);

  const fetchData = useCallback(async () => {
    try {
      const ipResponse = await axios.get("https://api64.ipify.org?format=json");

      if (ipResponse.status === 200) {
        const userIp = ipResponse.data.ip;

        const response = await axios.get(
          `${API_ROOT}/api/event/eventdetails/${event_slug}`
        );
        console.log("response :", response);

        const data = response.data.eventData;
        setEventData(data);
        // setHtmlContent(dataPost.post_content);
        // setEentSlug(dataPost.post_author_id);
      } else {
        console.error("Error fetching IP address:", ipResponse.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 501) {
        navigate(`/events/${event_slug}`);
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

  const handleHeaderClick = () => {
    setAccordionOpen(!accordionOpen);
  };

  const shareText = data?.post_title;

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
      <div className="row" style={{ overflow: "hidden" }}>
      <div className="col-md-9 borderR">
  <div className="paddings">
    {/* Display the main event title */}
    <h1 className="fw-bold mt-1 h2">{data?.event_title}</h1>

    {eventData && eventData.length > 0 && (
      <>
        {eventData.map((event, index) => (
          <div key={event.event_id} className="event-item">
            {/* Display event title only for the individual event */}
            <div>
              <h2 className="fw-bold mt-1 h3">{event.event_title}</h2>
            </div>

            {/* Social Share Section */}
            <div
              className="social-share-container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
                width: "100%",
              }}
            >
              <button className="share-btn mb-1">
                <img
                  src={shareIcon}
                  alt="share"
                  width="23"
                  height="auto"
                  style={{
                    padding: "1px",
                  }}
                />
              </button>

              <div className="d-flex align-items-center gap-1">
                <SocialShare
                  url={event.event_link}
                  title={event.event_title}
                  img={`${webPath}${event.event_banner}`}
                />
                <div>

                <button
                  onClick={handleInstagramShare}
                  className="instaBackColor"
                  style={{
                    border: "none",
                    height: "27px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{
                      fontSize: "17px",
                      color: "#fff",
                    }}
                  />
                </button>
                </div>
              </div>
            </div>

            {/* Conditional Loading or Image */}
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
                </div>
              )
            ) : (
              !event.podcast_link &&
              event.event_banner &&
              event.banner_show === 1 && (
                <div className="mt-3">
                  <img
                    className="topicImg"
                    src={`${webPath}${event.event_banner}`}
                    alt={event.event_title}
                    width="150"
                    height="100"
                    loading="lazy"
                  />
                </div>
              )
            )}

            {/* Event Details */}
            <div>
              <p className="mt-4" style={{ fontSize: "18px" }}>
                {new Date(event.event_date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div style={{ fontSize: "14px" }}>
              <div
                className="content mt-2"
                dangerouslySetInnerHTML={{ __html: event.event_desc }}
              />
            </div>
          </div>
        ))}
      </>
    )}
  </div>
</div>


  {/* Sidebar */}
  <div className="col-md-3 col-12" style={{ minHeight: "700px" }}>
    <Tabs
      activeKey={activeKey}
      onSelect={handleTabSelect}
      id="tabs-example"
      className="tabBtn nav-link1 colrtab"
    >
      {["Latest", "Popular"].map((tab, index) => (
        <Tab
          key={`tab-${index}`}
          eventKey={`tab${index + 1}`}
          title={tab}
          className="text-black"
        >
          <TabContent className="marTop">
            <div className="paddings">
              {Array.isArray(displayedData) &&
                displayedData.map((x) => (
                  <a key={x.id} href="#" className="a-tag">
                    <TextCard
                      key={x.id}
                      title={x.post_title}
                      desc={x.post_content}
                      post_author={x.post_author}
                      post_date={x.post_date}
                    />
                  </a>
                ))}
            </div>
          </TabContent>
        </Tab>
      ))}
    </Tabs>

    {/* Advertisement Section */}
    <div
      className="marTop heightAuto"
      style={{ textAlign: "center", height: "400px" }}
    >
      {advertisementData && advertisementData.length > 0 && (
        <a
          href={`${advertisementData[1]?.dest_url}`}
          aria-label="Visit advertisement page"
        >
          <img
            className="mt-5"
            style={{ height: "300px", width: "auto" }}
            src={`${webPath}${advertisementData[1]?.banner_img}?width=600`}
            alt={advertisementData[1]?.banner_name}
            aria-label={advertisementData[1]?.banner_name}
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
    </>
  );
};

export default React.memo(EventDetail);
