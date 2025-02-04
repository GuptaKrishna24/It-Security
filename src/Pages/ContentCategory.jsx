import React from "react";
import { Tab, Nav, Col, Row, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataComp } from "../Component/DataComp";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { CardComp } from "../Component/CardComp";
import TextCard from "../Component/TextCard";
import { API_ROOT, webPath } from "../apiConfig";

import LazyLoad from "react-lazyload";

const ContentCategory = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const { cat_slug, subcat } = useParams();

  const [postData, setPostData] = useState([]);

  const [categories, setCategories] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const fetchData = async () => {
    try {
      let apiUrl = `${API_ROOT}/api/post/topic/${cat_slug}`;

      if (subcat) {
        apiUrl += `/${subcat}`;
      }

      apiUrl += `?page=${pagination.page}&limit=${pagination.limit}`;

      const response = await axios.get(apiUrl);

      const jsonData = response.data;

      if (
        typeof jsonData === "object" &&
        jsonData !== null &&
        "posts" in jsonData
      ) {
        const { posts } = jsonData;

        if (
          typeof posts === "object" &&
          posts !== null &&
          "postData" in posts &&
          "pagination" in posts
        ) {
          const { postData, pagination } = posts;

          if (
            typeof pagination === "object" &&
            pagination !== null &&
            "totalItems" in pagination &&
            "totalPages" in pagination
          ) {
            if (postData.length === 0) {
              // Navigate to NoPost component if there are no posts
              navigate("/no-posts");
            } else {
              setPostData(postData);
              setPagination((prevPagination) => ({
                ...prevPagination,
                totalItems: pagination.totalItems,
                totalPages: pagination.totalPages,
              }));
            }
          } else {
            console.error("Invalid pagination structure:", pagination);
            navigate("/404"); // Redirect to 404 page
          }
        } else {
          console.error("Invalid posts structure:", posts);
          navigate("/404"); // Redirect to 404 page
        }
      } else {
        console.error("Invalid JSON data structure:", jsonData);
        navigate("/404"); // Redirect to 404 page
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // navigate("/no-posts");
    }
  };

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
          <h1 className="fw-bold py-1 mt-3">
            {cat_slug.charAt(0).toUpperCase() + cat_slug.slice(1)} {subcat}
          </h1>
          <div className="hr"></div>
          <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
            <Row className="clearfix mt-2">
              <Col sm={12}>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="Filter" className="tabButton" disabled>
                      Filter :
                    </Nav.Link>
                  </Nav.Item>
                  {categories?.slice(0, 6)?.map((category, index) => (
                    <Nav.Item>
                      <Nav.Link
                        href={`/topic/${cat_slug}/${category.subcat_slug}`}
                        className={`tabButton  backgRed ${
                          subcat === category.subcat_slug ? "isActive" : ""
                        }`}
                      >
                        {category?.subcat_name}
                      </Nav.Link>
                    </Nav.Item>
                  ))}

                  <Nav.Item>
                    <NavDropdown
                      title="More"
                      id="nav-dropdown-within-tab"
                      className="droptabs text-black colorblack"
                      style={{ position: "static" }}
                    >
                      {categories?.slice(6).map((category, index) => (
                        <NavDropdown.Item
                          Key="index"
                          className={`tabButton  backgRed ${
                            subcat === category.subcat_slug ? "isActive" : ""
                          }`}
                          href={`/topic/${cat_slug}/${category?.subcat_slug}`}
                        >
                          {category?.subcat_name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    {postData.length === 0 ? (
                      <>
                        <LazyLoad className={className}>
                          <div className="text-center mt-5 mb-5">
                            <h5>No Posts Available</h5>
                            <p>
                              Sorry, there are no posts available at the moment.
                            </p>
                          </div>
                        </LazyLoad>
                      </>
                    ) : (
                      <>
                        <LazyLoad className={className}>
                          <div className="row">
                            {postData?.slice(0, 3)?.map((item, i) => (
                              <div key={i} className="col-md-4">
                                <div className="mainSecondBox mt-3">
                                  <a
                                    className="a-tag"
                                    href={`/${item?.cat_slug}/${item?.post_name}`}
                                  >
                                    <DataComp
                                      h2Title={item.post_title}
                                      p_Desc={item?.post_content}
                                      post_author={item?.post_author}
                                      post_date={item?.post_date}
                                      src={`${webPath}${item.banner_img}`}
                                      alt={item.post_name}
                                    />
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </LazyLoad>
                        <div className="container mt-5 mb-5 borderT">
                          <LazyLoad className={className1}>
                            <div className="row">
                              <div className="col-md-8 col-12">
                                {postData?.slice(3)?.map((item) => (
                                  <div
                                    key={item.id}
                                    className="d-flex justify-content-evenly mt-2"
                                  >
                                    <div className="row align-items-center">
                                      <div className="col-md-3 col-12 mt-3 p-0">
                                        <a
                                          className="a-tag"
                                          href={`/${item?.cat_slug}/${item?.post_name}`}
                                        >
                                          <CardComp
                                            src={`${webPath}${item?.banner_img}`}
                                            alt={item?.name}
                                          />
                                        </a>
                                      </div>
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
                                <div className="paginationBox mt-5">
                                  <a href="#datas" className="mt-1 mb-1">
                                    <button
                                      className="PaginatinNextBtn"
                                      disabled={pagination.page === 1}
                                      onClick={() => {
                                        handlePageChange(pagination.page - 1);

                                        // Adding a timeout to ensure the scroll happens after the page change
                                        setTimeout(() => {
                                          window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                          });
                                        }, 100); // Adjust the timeout as necessary
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
                                        pagination.page ===
                                        pagination.totalPages
                                      }
                                      onClick={() => {
                                        handlePageChange(pagination.page + 1);
                                        // Adding a timeout to ensure the scroll happens after the page change
                                        setTimeout(() => {
                                          window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                          });
                                        }, 100); // Adjust the timeout as necessary
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faAngleRight} />
                                    </button>
                                  </a>
                                </div>
                              </div>
                              <div className="col-md-4 col-12">
                                <div
                                  className="marTop heightAuto"
                                  style={{ textAlign: "center" }}
                                >
                                  {advertisementData &&
                                    advertisementData.length > 0 && (
                                      <a
                                        href={`${advertisementData[0].dest_url}`}
                                        aria-label="Visit advertisement page"
                                      >
                                        <img
                                          className="mt-5"
                                          style={{
                                            height: "auto",
                                            width: "100%",
                                          }}
                                          src={`${webPath}${advertisementData[0].banner_img}?width=600`}
                                          alt={advertisementData[0].banner_name}
                                          aria-label={
                                            advertisementData[0].banner_name
                                          }
                                          loading="lazy"
                                          width="640"
                                          height="360"
                                        />
                                      </a>
                                    )}
                                </div>
                              </div>
                            </div>
                          </LazyLoad>
                        </div>
                      </>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>

      <div className="container container-max ">
        <div className="row mt-2 spaceincontentbottm">
          <div className="col-md-12 mb-2 borderB">
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

export default ContentCategory;
