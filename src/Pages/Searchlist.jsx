import React, { useState, useEffect } from "react";
import { Tab, Nav, Col, Row, NavDropdown } from "react-bootstrap";
import { DataComp } from "../Component/DataComp";
import { CardComp } from "../Component/CardComp";
import TextCard from "../Component/TextCard";
import { useParams } from "react-router-dom";
import { webPath, API_ROOT } from "../apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "../Styles/SearchList.css";
import axios from "axios";
import LazyLoad from "react-lazyload";

export const SearchList = () => {
  const [news, setNews] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const { searchVal, cat } = useParams(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [advertisementData, setAdvertisementData] = useState([]);
  const [noResults, setNoResults] = useState(false);



  const [className, setClassName] = useState("");


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
    const sections = 5; 
    let currentSection = 1;
  
    const setSectionClassName = () => {
      
      const removeTimer = setTimeout(() => {
        setClassName('');
      }, 0);
  
     
      const setTimer = setTimeout(() => {
        setClassName('loaded');
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
    const fetchAdvertisementData = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/api/advertisement/get_active`
        );
        setAdvertisementData(response?.data);
   
      } catch (error) {
        console.error("Error fetching advertisement data:", error);
      }
    };

    fetchAdvertisementData();
  }, []);

  useEffect(() => {
    const fetchNews = async (page) => {
      setLoading(true);
      setNoResults(false); // Reset no results flag

      try {
        const response = await fetch(
          `${API_ROOT}/api/post/search/${cat}/${searchVal}?page=${page}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (
          data.success &&
          data?.result &&
          Array.isArray(data.result.postData)
        ) {
          if (data.result.pagination.totalItems === 0) {
            setNoResults(true); // Set no results flag
          } else {
            setNews(data.result.postData);
            setTotalPages(data.result.pagination.totalPages);
          }
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews(currentPage);
  }, [searchVal, currentPage]);

  const itemsPerPage = 5; 
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Calculate which page numbers to display
  const startIndex = Math.max(currentPage - Math.floor(itemsPerPage / 2), 1);
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalPages);

  // Generate page numbers for pagination buttons
  const pageNumbers = [];
  for (let i = startIndex; i <= endIndex; i++) {
    pageNumbers.push(i);
  }

  const [categories, setCategories] = useState(["all"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ROOT}/api/category/all`);
        const data = await response.json();
        // console.log("aaaa",data)
        setCategories(data);
     
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 


  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   // Set a 2-second delay before updating the message
  //   const timer = setTimeout(() => {
  //     setMessage(noResults ? "No Result For Your Search" : `Search Result: ${searchVal}`);
  //   }, 500); // 2000 milliseconds = 2 seconds

  //   // Cleanup the timer if the component unmounts or if the effect is re-run
  //   return () => clearTimeout(timer);
  // }, [searchVal, noResults]); // Dependencies array

  return (


    <>
    
    <LazyLoad className={className}>

    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="fw-bold py-1 mt-3" id="top">
          {noResults ? "No Result For Your Search" : `Search Result : ${searchVal}`}
          {/* {message} */}
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

                  {categories?.slice(0, 8)?.map((category, index) => (
                    <Nav.Item key={index}> 
                      <Nav.Link
                        className={`tabButton backgRed ${
                          category?.cat_slug === cat ? "isActive" : ""
                        }`}
                        href={`/search/${category?.cat_slug}/${searchVal}`}
                      >
                        {category?.cat_name} 
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                  
                  <Nav.Item>
                    <NavDropdown
                      title="More"
                      id="nav-dropdown-within-tab"
                      className="droptabs text-black colorblack"
                    >
                      {categories?.slice(8, 100)?.map((category, index) => (
                        <NavDropdown.Item
                          key={index} // Change Key to key
                          className={`tabButton backgRed ${
                            category.cat_slug === cat ? "isActive" : ""
                          }`}
                          href={`/search/${category?.cat_slug}/${searchVal}`}
                        >
                          {category?.cat_name} 
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  </Nav.Item>
                  
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="row">
                      {news?.slice(0, 3)?.map((article) => (
                        <div className="col-md-4" key={article?.id}>
                          <div className="mainSecondBox mt-3">
                            <a
                              href={`/${article?.cat_slug}/${article?.post_name}`}
                              className="text-decoration-none hoverHead text-black"
                            >
                              <DataComp
                                post_author={article?.post_author}
                                h2Title={article?.post_title}
                                title={article?.post_title}
                                src={`${webPath}${article?.banner_img}?width=500`}
                                alt={article?.post_title}
                                post_date={article?.post_date}
                                loading="lazy"
                              />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="container mt-5 mb-5 borderT">
                      <div className="row">
                        <div className="col-md-8 col-12">
                          {news?.slice(3, 100)?.map((article) => (
                            <div
                              key={article.id}
                              className="d-flex justify-content-evenly mt-2"
                            >
                              <div className="row align-items-center">
                                <div className="col-md-3 col-12 mt-3">
                                  <a
                                    href={`/${article?.cat_slug}/${article?.post_name}`}
                                    className="text-decoration-none hoverHead text-black"
                                  >
                                    <CardComp
                                      post_author={article?.post_author}
                                      h2Title={article?.post_title}
                                      title={article?.post_title}
                                      src={`${webPath}${article.banner_img}?width=500`}
                                      alt={article?.post_title}
                                    />
                                  </a>
                                </div>
                                <div className="col-md-9 col-12">
                                  <a
                                    href={`/${article?.cat_slug}/${article?.post_name}`}
                                    className="text-decoration-none hoverHead text-black"
                                  >
                                    <TextCard title={article?.post_title} post_author={article?.post_author} post_date={article?.post_date}/>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div>
                            <div className="text-center mt-4 pagination-btn">
                              <a href="#top">
                              <button
  onClick={() => {
    handlePrevPage();

    // Scroll to the top of the page after navigating to the previous page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100); // Adjust the timeout as necessary
  }}
>
  <FontAwesomeIcon icon={faAngleLeft} />
</button>

                              </a>

                                {pageNumbers?.slice(0, 5)?.map((page) => (
                             
                                  <button
                                  
                                    onClick={() => {
                                      handlePageClick(page);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    style={{
                                      marginLeft: "5px",
                                      fontWeight: currentPage === page ? "bold" : "normal",
                                      backgroundColor: currentPage === page ? "#000" : "white",
                                      color: currentPage === page ? "white" : "black",
                                    }}
                                    className="mainPageBtn"
                                  >
                                    {page}
                                  </button>
                            
                              ))}


                              <a href="#top">
                              <button
                                onClick={() => {
                                  handleNextPage();

                                  // Scroll to the top of the page after navigating to the next page
                                  setTimeout(() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }, 100); // Adjust the timeout as necessary
                                }}
                              >
                                <FontAwesomeIcon icon={faAngleRight} />
                              </button>

                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-12">
                         
                         <LazyLoad className={className1}>
                          <div
                            className="marTop heightAuto"
                            style={{ textAlign: "center" }}
                          >
                            {advertisementData &&
                              advertisementData.length > 0 && (
                                <a
                                  href={`${advertisementData[0]?.dest_url}`}
                                  aria-label="Visit advertisement page"
                                >
                                  <img
                                    className="mt-5"
                                    style={{ height: "auto", width: "100%" }}
                                    src={`${webPath}${advertisementData[0]?.banner_img}?width=600`}
                                    alt={advertisementData[0].banner_name}
                                    aria-label={
                                      advertisementData[0]?.banner_name
                                    }
                                    loading="lazy"
                                    width="640"
                                    height="360"
                                  />
                                </a>
                              )}
                          </div>
                          </LazyLoad>
                        </div>
                      </div>
                    </div>
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
    </LazyLoad>
    
    
    </>
 
  );
};
