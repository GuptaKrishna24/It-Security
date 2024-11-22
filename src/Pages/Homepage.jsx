import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Tab, Tabs, TabContent } from "react-bootstrap";
import axios from "axios";
import "../Styles/Homepage.css";
import { useMediaQuery } from "react-responsive";
import { DataComp } from "../Component/DataComp";
import TextCard from "../Component/TextCard";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LazyLoad from "react-lazyload";
import { API_ROOT, webPath } from "../apiConfig";

const generateSrcSet = (imagePath, widths) => {
  return widths.map((width) => `${imagePath}?width=${width} ${width}w`).join(", ");
};

const Homepage = () => {
  const [activeKey, setActiveKey] = useState("tab1");
  const [newData, setNewData] = useState(
     []
  );
  const [latestData, setLatestData] = useState(
     []
  );
  const [popularData, setPopularData] = useState(
   []
  );
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const handleTabSelect = useCallback((key) => {
    setActiveKey(key);
  }, []);

  const fetchData = async (url, setter, key) => {
    try {
      setLoading(true);

      const response = await fetch(url);
      const data = await response.json();


      setter(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllData = () => {
      fetchData(
        `${API_ROOT}/api/post/homelatest`,
        setNewData,
        "newData"
      );

      fetchData(
        `${API_ROOT}/api/post/homelatestnews`,
        setLatestData,
        "latestData"
      );

      fetchData(
        `${API_ROOT}/api/post/homepopular`,
        setPopularData,
        "popularData"
      );
    };

    fetchAllData();


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
      }, currentSection * 150);

      return () => {
        clearTimeout(removeTimer);
        clearTimeout(setTimer);
      };
    };

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setSectionClassName();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const displayedData = useMemo(
    () => (activeKey === "tab1" ? latestData : popularData),
    [activeKey, latestData, popularData]
  );

  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const dataCompWidth = isLargeScreen ? 500 : 300;

  return (
    <div
      className="container container-max mt-3 main-page"
      style={{ overflow: "hidden" }}
    >
      <div className="row">
        <div className="col-12">
          <h1 className="fw-bold borderB py-1 h5">Latest</h1>
        </div>

        <div
          className="col-md-9 col-12 container borderR"
          style={{ overflow: "hidden", minHeight: '700px' }}
        >
          <>
            {newData.length > 0 && (
              <a
                className="text-decoration-none text-black"
                href={`${newData[0]?.cat_slug}/${newData[0]?.post_name}`}
              >
                <link rel="preload" as="image" href={`${newData[0]?.banner_img}`} />
                <DataComp
                  src={`${webPath}${newData[0]?.banner_img}?width=${isLargeScreen ? 700 : 200
                    }`}
                  alt={newData[0]?.post_name}
                  h2Title={newData[0]?.post_title}
                  p_Desc={newData[0]?.post_content}
                  post_author={newData[0]?.post_author}
                  post_date={newData[0]?.post_date}
                  withZoom={false}
                  fetchpriority="high"
                />
              </a>
            )}
          </>

          <div className="mainSecondBox mt-3" style={{ overflow: "hidden" }}>
            <div className="row">
              {Array.isArray(newData) && newData?.slice(1, 3)?.map((item) => (
                <div key={item.id} className="col-md-6 col-12">
                  <a
                    className="text-decoration-none text-black"
                    href={`${item?.cat_slug}/${item?.post_name}`}
                  >
                    <link rel="preload" as="image" href={`${item?.banner_img}`} />
                    <DataComp
                      src={`${webPath}${item?.banner_img}?width=${dataCompWidth}`}
                      srcSet={generateSrcSet(
                        `${webPath}${item?.banner_img}`,
                        [150, 300, 500, 700, 1000, 1200]
                      )}
                      alt={item?.post_name}
                      h2Title={item?.post_title}
                      p_Desc={item.post_content}
                      post_author={item?.post_author}
                      post_date={item?.post_date}
                      withZoom={true}
                      fetchpriority="low"

                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-3 col-12" style={{ minHeight: '700px' }}>
          {isLargeScreen ? (
            <Tabs
              activeKey={activeKey}
              onSelect={handleTabSelect}
              id="tabs-example"
              className="tabBtn nav-link1 colrtab"
            >
              {["Latest", "Popular"]?.map((tab, index) => (
                <Tab
                  key={`tab-${index}`}
                  eventKey={`tab${index + 1}`}
                  title={tab}
                  className="text-black"
                >
                  <TabContent className="marTop">
                    <div className="paddings">
                      {Array.isArray(displayedData) && displayedData?.map((x) => (
                        <a
                          key={x.id}
                          href={`${x.cat_slug}/${x.post_name}`}
                          className="a-tag"
                        >
                          <TextCard
                            key={x?.id}
                            title={x?.post_title}
                            desc={x?.post_content}
                            post_author={x?.post_author}
                            post_date={x?.post_date}
                          />
                        </a>
                      ))}
                    </div>
                  </TabContent>
                </Tab>
              ))}
            </Tabs>
          ) : (
            <LazyLoad className={className1}>
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
                        {displayedData.map((x) => (
                          <a
                            key={x?.id}
                            href={`${x?.cat_slug}/${x?.post_name}`}
                            className="a-tag"
                          >
                            <TextCard
                              key={x?.id}
                              title={x?.post_title}
                              desc={x?.post_content}
                              post_author={x?.post_author}
                              post_date={x?.post_date}
                            />
                          </a>
                        ))}
                      </div>
                    </TabContent>
                  </Tab>
                ))}
              </Tabs>
            </LazyLoad>
          )}

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
  );
};

export default Homepage;
