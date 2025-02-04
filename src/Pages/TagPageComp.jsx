import React, { useRef, useState, useEffect } from "react";
import { DataComp } from "../Component/DataComp";

import axios from "axios";
import TextCard from "../Component/TextCard";
import { useParams, useNavigate } from "react-router-dom";

import { CardComp } from "../../src/Component/CardComp";
import LearningComp from "./TagPage/LearningComp";
import HotSeatComp from "./TagPage/HotSeatComp";
import FutureReadyComp from "./TagPage/FutureReadyComp";
import { ArticleComp } from "./TagPage/ArticleComp";

import "../../src/Styles/TagPage/Category.css";
import { webPath, API_ROOT } from "../apiConfig";
import TagPodComp from './TagPage/TagPodComp';

function TagPageComp() {
  const [open, setOpen] = useState(false);
  const [showSection1, setShowSection1] = useState(false);
  const { subcat } = useParams();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("listData")) || null
  );
  // eslint-disable-next-line
  const [subcatName, setsubcatName] = useState("");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  // const limit = 3;


  const navigate = useNavigate();




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/api/post/tag/${subcat}`
        );
        const fetchedData = response?.data?.posts;


        const storedData = localStorage.getItem("listData");

        if (JSON.stringify(fetchedData) !== storedData) {

          setData(fetchedData);
          localStorage.setItem("listData", JSON.stringify(fetchedData));
        } else {

          setData(JSON.parse(storedData));

        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          console.error("Error response status:", error.response.status);
          if (error.response.status === 500 || error.response.status === 501) {
            navigate("/404");
          }

        } else {

          console.error("Network or unexpected error:", error.message);
        }
        setLoading(false);
      }
      finally {
        setIsDataLoaded(true);
        
      }
    }

    fetchData();
    // const intervalId = setInterval(fetchData, 10000);

    // return () => clearInterval(intervalId);
  }, [subcat]);


  useEffect(() => {
    const isSection1DataPresent = true;
    setShowSection1(isSection1DataPresent);
  }, []);

  //eslint-disable-next-line
  const [show, setShow] = useState(false);

  const [sidenavWidth, setSidenavWidth] = useState(0);

  useEffect(() => {
    const handleScroll = (event) => {
      if (window.scrollY > 500) {
        setShow(true);
      }
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };
    handleScroll();
  }, []);

  const News = useRef();
  const Article = useRef();
  const QuickBytes = useRef();
  const Podcasts = useRef();
  const HotSeats = useRef();
  const FutureReady = useRef();
  const GuestAuthor = useRef();
  const LearningCenter = useRef();

  const scrollHandler = (elemRef) => {
    if (elemRef.current) {
      const extraSpacing = 90;
      window.scrollTo({
        top: elemRef.current.offsetTop - extraSpacing,
        behavior: "smooth",
      });
    } else {
      alert("Nohing is there!!!...");
    }
  };

  const closeNav = () => {
    setSidenavWidth(0);
  };

  // const handleToggleSidenav = () => {
  //   const newWidth = show ? 0 : 125;
  //   setSidenavWidth(newWidth);
  //   setShow(!show);
  // };


  const scrollHandlerNews = (elemRef) => {
    if (elemRef.current) {
      const extraSpacing = 60;
      window.scrollTo({
        top: elemRef.current.offsetTop - extraSpacing,
        behavior: "smooth",
      });
    }
  };

  const scrollHandlerOther = (elemRef) => {
    if (elemRef.current) {
      const extraSpacing = 85;
      window.scrollTo({
        top: elemRef.current.offsetTop - extraSpacing,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const sidenav = document.getElementById("mySidenav");
      const main = document.getElementById("main");

      if (
        sidenav &&
        main &&
        !sidenav.contains(event.target) &&
        !main.contains(event.target)
      ) {
        closeNav();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleToggle = () => {
    const newWidth = open ? 0 : 120;
    setSidenavWidth(newWidth);
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const sidenav = document.getElementById("mySidenav");
      const main = document.getElementById("main");

      if (
        sidenav &&
        main &&
        !sidenav.contains(event.target) &&
        !main.contains(event.target)
      ) {
        closeNav();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
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

  return (
    <>
      <div className="open-data">
        {open && (
          <header>
            <ul
              id="mySidenav"
              className="sidenav DesktopResponsive"
              style={{ height: `${sidenavWidth}px` }}
            >
                  {showSection1 && (
                <li onClick={() => scrollHandlerNews(News)}>News</li>
              )}
              {showSection1 && (
                <li onClick={() => scrollHandler(Article)}>Articles</li>
              )}
              {showSection1 && (
                <li onClick={() => scrollHandler(QuickBytes)}>Quick Bytes</li>
              )}

              <li onClick={() => scrollHandler(Podcasts)}>Podcast</li>
              <li onClick={() => scrollHandlerOther(HotSeats)}>Hot Seats</li>
              <li onClick={() => scrollHandler(FutureReady)}>Future Ready</li>

              <li onClick={() => scrollHandler(GuestAuthor)}>Guest Author</li>
              <li onClick={() => scrollHandlerOther(LearningCenter)}>
                Learning Center
              </li>
            </ul>
          </header>
        )}
      </div>
      <div
        id="main"
        className="DesktopResponsive "
        style={{
          textAlign: "end",
          marginTop: "-30px",
          position: "fixed",
          left: "98%",
          top: "300px",
        }}
      >
        <span
          onClick={handleToggle}
          style={{
            cursor: "pointer",
            writingMode: "vertical-rl",
            transform: "rotateZ(180deg)",
          }}
          className="verticalCat"
        >
          Category
        </span>
      </div>

      <div ref={News}></div>
      <div className="container container-max">
        <h1 className="fw-bold py-1 mt-2 h1">{subcat.charAt(0).toUpperCase() + subcat.slice(1)}</h1>
        <ArticleComp data={data?.news} />
      </div>
      <div ref={Article}></div>
 
        <div className="container mt-5">
          <div className="row">
            <h3 className="fw-bold borderB py-1 h4">Articles</h3>

            <div
              className="col-md-3 col-12"
              style={{ borderRight: "1px solid #eaeaea" }}
            >
              <>
              {data?.featured.length>0 && isDataLoaded?(<>      {data?.featured?.slice(0, 7)?.map((item) => (
                  <>
                    <a
                      className="a-link text-black"
                      href={`/${item?.cat_slug}/${item?.post_name}`}
                    >
                      <TextCard
                        title={item?.post_title}
                        post_author={item?.post_author}
                        post_date={item?.post_date}
                      />
                    </a>
                  </>
                ))}</>):(<div className="mt-2">
                  <h5>No Posts Available</h5>
                </div>)}
              </>
            </div>
            <div className=" col-md-9 col-12">
              {data?.featured?.slice(6)?.map((item, index) => (
                <a
                  className="a-link text-black"
                  href={`/${item?.cat_slug}/${item?.post_name}`}
                >
                  <DataComp
                    key={index}
                    src={`${webPath}${item?.banner_img}?width=500`}
                    alt={item?.post_name}
                    h2Title={item?.post_title}
                    post_author={item?.post_author}
                    post_date={item?.post_date}
                    p_Desc={item?.p_content}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

      <div ref={QuickBytes}></div>
   
        <div className="container mt-5">
          <div className="row">
            <h3 className="fw-bold borderB py-1 h4">Quick Bytes</h3>

            <div className="col-md-8 col-12">
            {data?.quickbytes.length>0 ?(<>       {data?.quickbytes?.map((item, index) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-evenly container"
                >
                  <div className="row">
                    <div className="col-md-3 col-12 mt-3">
                    <a
                        className="a-link text-black"
                        href={`/${item.cat_slug}/${item.post_name}`}
                      >
                      <CardComp
                        src={`${webPath}${item?.banner_img}?width=500`}
                        alt={item?.post_name}
                      />
                        </a>
                    </div>
                    <div className="col-md-9 col-12 mt-3">
                      <a
                        className="a-link text-black"
                        href={`/${item.cat_slug}/${item.post_name}`}
                      >
                        <TextCard
                          title={item?.post_title}
                          post_author={item?.post_author}
                          post_date={item?.post_date}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))}</>):(<div className="mt-2">
                <h5>No Posts Available</h5>
              </div>)}
       
            </div>

            <div className="col-md-4 col-12">
              <div
                className="marTop heightAuto"
                style={{ textAlign: "center" }}
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


      <div className="container container-max ">
        <div className="row mt-5 spaceincontentbottm">
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
      <div ref={Podcasts}></div>
      <div className="mt-5">
        <TagPodComp order={false} data={data?.podcasts} />
      </div>

      <div ref={HotSeats}></div>
      <div className="mt-5">
        <HotSeatComp data={data?.interview} />
      </div>

      <div ref={FutureReady}></div>
      {data?.futureready && (
        <div className="mt-5">
          <FutureReadyComp data={data?.futureready} />
        </div>
      )}

      <div ref={GuestAuthor}></div>
      <div className="mt-5">
        <TagPodComp order={true} data={data?.guestauthor} />
      </div>

      <div ref={LearningCenter}></div>
      <div classname="mt-5">
        <LearningComp data={data?.learningcenter} />
      </div>

      <div className="container container-max ">
        <div className="row mt-5 spaceincontentbottm">
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
    </>
  );
}

export default TagPageComp;
