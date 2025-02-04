import React from "react";
import { Tab, Nav, Col, Row, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataComp } from "../Component/DataComp";
import axios from "axios";
import authorImg from '../Images/Author.jpg';
import "../Styles/Authorpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { CardComp } from "../Component/CardComp";
import TextCard from "../Component/TextCard";
import { API_ROOT, webPath } from "../apiConfig";

const AuthorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const { cat_slug, subcat, auther_name } = useParams();

  const [postData, setPostData] = useState([]);

  const [categories, setCategories] = useState([]);

  const [author, setAuthor] = useState([]);

  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });

  useEffect(() => {
    if (!Array.isArray(author) || author.length === 0) {
      // setShowNoDataMessage(true);
      const timer = setTimeout(() => setShowNoDataMessage(false), 500000); // Show message for 5 seconds

      return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    }
  }, [author]);

  useEffect(() => {
    const fetchAuthorData = async () => {
      let apiUrl = `${API_ROOT}/api/author/details/${auther_name}`;
      try {
        const response = await axios.get(apiUrl);
        const jsonData = response.data;
        const authorData = Array.isArray(jsonData.author)
          ? jsonData.author
          : [];

        setAuthor(authorData);

        console.log("Author data:", authorData); // Log to inspect data structure
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAuthorData();
  }, []);

  const fetchData = async () => {
    try {
      let apiUrl = `${API_ROOT}/api/author/posts/${auther_name}`;

      if (subcat) {
        apiUrl += `/${subcat}`;
      }

      apiUrl += `?page=${pagination.page}&limit=${pagination.limit}`;

      const response = await axios.get(apiUrl);
      console.log("API Response:", response.data); // Log raw response data

      const jsonData = response.data;

      // Check if 'authorPosts' exists and is valid
      if (
        typeof jsonData === "object" &&
        jsonData !== null &&
        "authorPosts" in jsonData
      ) {
        const authorPosts = jsonData.authorPosts; // Correctly access 'authorPosts'

        // Check if 'postData' and 'pagination' exist in 'authorPosts'
        if (
          typeof authorPosts === "object" &&
          authorPosts !== null &&
          "postData" in authorPosts &&
          "pagination" in authorPosts
        ) {
          const { postData, pagination } = authorPosts;

          // Check pagination structure
          if (
            typeof pagination === "object" &&
            pagination !== null &&
            "page" in pagination &&
            "limit" in pagination &&
            "totalPages" in pagination
          ) {
            if (postData.length === 0) {
              // Navigate to NoPost component if there are no posts
              navigate("/no-posts");
            } else {
              setPostData(postData); // Set post data state
              setPagination((prevPagination) => ({
                ...prevPagination,
                totalItems: postData.length, // Set totalItems based on postData length
                totalPages:
                  pagination.totalPages ||
                  Math.ceil(postData.length / pagination.limit), // Handle totalPages if null
              }));
            }
          } else {
            console.error("Invalid pagination structure:", pagination);
            navigate("/author"); // Redirect to 404 page
          }
        } else {
          console.error("Invalid authorPosts structure:", authorPosts);
          navigate("/author"); // Redirect to 404 page
        }
      } else {
        console.error("Invalid JSON data structure:", jsonData);
        navigate("/author"); // Redirect to 404 page
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally handle the error here (e.g., show an error message)
    }
  };

  console.log("author :", author);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ROOT}/api/category/subcatlist`);
        const data = await response.json();

        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error:", error.message);

        if (
          error.response &&
          error.response.status === 404 &&
          error.response.status !== 204
        ) {
          navigate("/404");
        } else {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.limit, cat_slug, subcat]);

  const handlePageChange = (newPage) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: newPage,
    }));
  };

  const calculatePageRange = () => {
    const totalPageCount = pagination.totalPages;
    const currentPage = pagination.page;

    const pageRange = 5;
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = startPage + pageRange - 1;

    if (endPage > totalPageCount) {
      endPage = totalPageCount;
      startPage = Math.max(1, endPage - pageRange + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const [advertisementData, setAdvertisementData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/api/advertisement/get_active`
        );
        setAdvertisementData(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching advertisement data:", error);
      }
    };

    fetchData();
  }, []);

  const [className, setClassName] = useState("");
  const [className1, setClassName1] = useState("");

  useEffect(() => {
    const sections = 5;
    let currentSection = 1;

    const setSectionClassName = () => {
      const removeTimer = setTimeout(() => {
        setClassName("");
      }, 0);

      const setTimer = setTimeout(() => {
        setClassName("loaded");
        currentSection++;

        if (currentSection <= sections) {
          setSectionClassName();
        }
      }, currentSection * 40);

      return () => {
        clearTimeout(removeTimer);
        clearTimeout(setTimer);
      };
    };

    setSectionClassName();
  }, []);

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
      }, currentSection * 150);

      return () => {
        clearTimeout(removeTimer);
        clearTimeout(setTimer);
      };
    };

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSectionClassName();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container" id="datas">
      <div className="row">
        <div className="col-md-12">
          <h3 className="fw-bold py-1 text-black mt-3">
            {author.length > 0 ? author[0]?.author_display_name : ""}
          </h3>
          <div className="hr"></div>
          <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
            <Row className="clearfix mt-2">
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <>
                      <div className="row">
                        {Array.isArray(author) && author.length > 0
                          ? author.map((item, i) => (
                              <div key={i} className="col-md-10 col-12">
                                <div className="mainSecondBox mt-3">
                                  <a
                                    className="a-tag d-flex flex-column flex-md-row align-items-center text-center text-md-start"
                                    href={`/${item?.cat_slug}/${item?.post_name}`}
                                  >
                                    {/* Image Section */}
                                    <img
                                      src={item.author_photo ? `${webPath}${item.author_photo}` : authorImg}
                                      alt={item.post_name}
                                      className="img-fluid mb-3 mb-md-0"
                                      style={{
                                        width: "150px",
                                        height: "auto",
                                    
                                      }}
                                      onClick={(e) => e.preventDefault()} // Prevent navigation when image is clicked
                                    />

                                    {/* Text Section */}
                                    <div>
                                      <p className="m-1">
                                        {item?.author_description}
                                      </p>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            ))
                          : showNoDataMessage && (
                              <p>No author data available.</p>
                            )}
                      </div>

                      <div className="container mt-5 mb-5 borderT p-0">
                        <div className="row">
                          {/* Posts Section */}
                          <div className="col-md-8 col-12 p-0">
                            {postData?.map((item) => (
                              <div
                                key={item.id}
                                className="d-flex flex-wrap justify-content-evenly mt-2"
                              >
                                <div className="row align-items-center w-100">
                                  {/* Image Section */}
                                  <div className="col-md-3 col-12 mt-3 p-0">
                                    <a
                                      className="a-tag"
                                      href={`/${item?.cat_slug}/${item?.post_name}`}
                                    >
                                      <CardComp
                                        src={`${webPath}${item?.banner_img}`}
                                        alt={item?.name}
                                        cardImg="cardImg"
                                      />
                                    </a>
                                  </div>

                                  {/* Text Section */}
                                  <div className="col-md-9 col-12">
                                    <a
                                      className="a-tag"
                                      href={`/${item?.cat_slug}/${item?.post_name}`}
                                    >
                                      <TextCard
                                        title={item.post_title}
                                        post_author={item.post_author}
                                        post_date={item.post_date}
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {/* Pagination Section */}
                            <div className="paginationBox mt-5">
                              <a href="#datas" className="mt-1 mb-1">
                                <button
                                  className="PaginatinNextBtn"
                                  disabled={pagination.page === 1}
                                  onClick={() => {
                                    handlePageChange(pagination.page - 1);

                                    // Scroll to the top after the page change
                                    setTimeout(() => {
                                      window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                      });
                                    }, 100);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                              </a>
                              {calculatePageRange().map((page) => (
                                <span key={page}>
                                  <button
                                    className={`${
                                      pagination.page === page
                                        ? "isActives"
                                        : ""
                                    } fw-bold PaginatinNextBtn`}
                                    onClick={() => {
                                      handlePageChange(page);
                                      window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                      });
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {page}
                                  </button>
                                </span>
                              ))}
                              <a href="#datas" className="mt-1 mb-1">
                                <button
                                  className="PaginatinNextBtn"
                                  disabled={
                                    pagination.page === pagination.totalPages
                                  }
                                  onClick={() => {
                                    handlePageChange(pagination.page + 1);
                                    setTimeout(() => {
                                      window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                      });
                                    }, 100);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                              </a>
                            </div>
                          </div>

                          {/* Advertisement Section */}
                          <div className="col-md-4 col-12 text-center mt-3">
                            {advertisementData &&
                              advertisementData.length > 0 && (
                                <a
                                  href={`${advertisementData[0].dest_url}`}
                                  aria-label="Visit advertisement page"
                                >
                                  <img
                                    className="img-fluid"
                                    src={`${webPath}${advertisementData[0].banner_img}?width=600`}
                                    alt={advertisementData[0].banner_name}
                                    aria-label={
                                      advertisementData[0].banner_name
                                    }
                                    loading="lazy"
                                  />
                                </a>
                              )}
                          </div>
                        </div>
                      </div>
                    </>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>

      <div className="container container-max ">
        <div className="row mt-2 spaceincontentbottm">
          <div className="col-md-12 mb-2 borderB" style={{padding:"0px"}}>
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
  );
};

export default AuthorPage;
