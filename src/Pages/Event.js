import React, { useEffect, useState, useMemo } from "react";
import "../Styles/Homepage.css";
import { useMediaQuery } from "react-responsive";
import { DataComp } from "../Component/DataComp";
import "react-loading-skeleton/dist/skeleton.css";
import { API_ROOT, webPath } from "../apiConfig";
import "../Styles/Event.css";
import { useNavigate } from "react-router-dom";

const Eventpage = () => {
  const [newData, setNewData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isPastHovered, setIsPastHovered] = useState(false);
  const [currentPage1, setCurrentPage1] = useState("upcoming"); // Default to "upcoming"
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null); // Track selected button
  const [isHovered, setIsHovered] = useState(false); // Track hover state for Past Events button

  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 320px)" });
  const dataCompWidth = useMemo(
    () => (isLargeScreen ? 500 : isSmallScreen ? 250 : 300),
    [isLargeScreen, isSmallScreen]
  );

  const generateSrcSet = (imagePath, widths) => {
    return widths
      .map((width) => `${imagePath}?width=${width} ${width}w`)
      .join(", ");
  };

  const cleanAndTruncate = (text, maxLength) => {
    const cleanedText = text.replace(/<\/?[^>]+(>|$)/g, "").trim();
    return cleanedText.length > maxLength
      ? `${cleanedText.slice(0, maxLength)}...`
      : cleanedText;
  };

  const fetchData = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_ROOT}/api/event/upcoming_events?page=${page}`
      );
      const result = await response.json();

      if (result.eventData.length > 0) {
        setNewData((prevData) => {
          const existingIds = new Set(prevData.map((item) => item.event_id));
          const uniqueItems = result.eventData.filter(
            (item) => !existingIds.has(item.event_id)
          );

          return [...prevData, ...uniqueItems];
        });

        if (page >= result.pagination.totalPages) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsDataLoaded(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);
  const handlePastEventsClick = () => {
    // setCurrentPage1("past")
    navigate("/past-events"); // Navigate to the /past-events page
  };
  const currentPage = "past";

  const handleUpcomingEventsClick = () => {
    // setCurrentPage1("upcoming");
    navigate("/events"); // Navigate to the /past-events page
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      className="container container-max mt-3 mb-2 main-page"
      style={{ overflow: "hidden" }}
    >
      <div className="row borderB ">
      <div className="col-12 borderB d-flex">
      {/* Upcoming Events Button */}
      <button
        className="btn btn-event ms-3"
        style={{
          border: "1px solid #000",
          borderBottom: "none",
          borderRadius: "5px 5px 0 0",
          padding: "5px 15px",
          width: "180px",
          height: "50px",
          backgroundColor: "#000",
          color:  "#fff" ,
          cursor: "pointer",
        }}
        onClick={handleUpcomingEventsClick}
      >
        <h1 className="fw-bold py-1 h6" style={{ margin: 0 }}>
          Upcoming Events
        </h1>
      </button>

      {/* Past Events Button */}
      <button
        className="btn btn-event ms-3"
        style={{
          border: "1px solid #000",
          borderBottom: "none",
          borderRadius: "5px 5px 0 0",
          padding: "5px 15px",
          width: "150px",
          height: "50px",
          backgroundColor:  "#fff",
          color: "#000" ,
          cursor: "pointer",
        }}
        onClick={handlePastEventsClick}
      >
        <h1 className="fw-bold py-1 h6" style={{ margin: 0 }}>
          Past Events
        </h1>
      </button>
    </div>

        <div
          className="col-12 container"
          style={{ overflow: "hidden", minHeight: "700px" }}
        >
          <div className="mainSecondBox mt-3" style={{ overflow: "hidden" }}>
            <div className="row g-3">
              {newData.map((item) => (
                <div key={item.event_id} className="col-lg-4 col-md-6 col-12">
                  <a
                    href={`/events/${item.event_slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="event-card"
                      style={{
                        overflow: "hidden",
                        padding: "10px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <DataComp
                        src={`${webPath}${item.event_banner}?width=${dataCompWidth}`}
                        srcSet={generateSrcSet(
                          `${webPath}${item.event_banner}`,
                          [150, 250, 300, 320, 500, 700, 1000, 1200]
                        )}
                        alt={item.event_title}
                        h2Title={
                          <h2
                            style={{
                              fontWeight: "bold",
                              height: "50px",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                              textOverflow: "ellipsis",
                              fontSize: "18px",
                              lineHeight: "1.5",
                              margin: "0",
                              cursor: "pointer",
                              wordBreak: "break-word",
                            }}
                          >
                            {item.event_title}
                          </h2>
                        }
                        post_location={
                          <div
                            className="mt-1"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "20px",
                              color: "black",
                            }}
                          >
                            <span
                              className="fw-bold"
                              style={{
                                fontSize: "13px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                marginRight: "5px",
                              }}
                            >
                              {item.event_location}
                            </span>
                            <span
                              style={{
                                fontSize: "13px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              |{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              }).format(new Date(item.event_date))}
                            </span>
                          </div>
                        }
                        p_Desc={
                          <p
                            style={{
                              width: "300px",
                              height: "38px",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                              textOverflow: "ellipsis",
                              lineHeight: "1.5",
                              wordBreak: "break-word",
                              marginBottom: "2px",
                            }}
                          >
                            {cleanAndTruncate(item.event_desc, 100)}
                          </p>
                        }
                        withZoom={true}
                        fetchpriority="low"
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {hasMore && isDataLoaded && (
            <div className="d-flex justify-content-center  mt-3">
              <button
                onClick={handleLoadMore}
                className="btn btn-dark w-20"
                disabled={loading}
              >
                {loading ? "Loading..." : "Show More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Eventpage;
