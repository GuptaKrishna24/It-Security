import React, { useEffect, useState, useMemo, useCallback } from "react";
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
  const [currentTab, setCurrentTab] = useState("upcoming"); // Track the current tab

  const navigate = useNavigate();

  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 320px)" });

  const dataCompWidth = useMemo(() => {
    if (isLargeScreen) return 500;
    if (isSmallScreen) return 250;
    return 300;
  }, [isLargeScreen, isSmallScreen]);

  // Function to generate the responsive srcSet for images
  const generateSrcSet = (imagePath, widths) => {
    return widths
      .map((width) => `${imagePath}?width=${width} ${width}w`)
      .join(", ");
  };

  // Function to clean and truncate description text
  const cleanAndTruncate = (text, maxLength) => {
    const cleanedText = text.replace(/<\/?[^>]+(>|$)/g, "").trim();
    return cleanedText.length > maxLength
      ? `${cleanedText.slice(0, maxLength)}...`
      : cleanedText;
  };

  // Fetch data from the API
  const fetchData = useCallback(async (tab, page) => {
    try {
      setLoading(true);
      const endpoint =
        tab === "upcoming"
          ? "/api/event/upcoming_events"
          : "/api/event/past_events";

      const response = await fetch(`${API_ROOT}${endpoint}?page=${page}`);
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
      setLoading(false);
    }
  }, []);

  // Fetch data when tab or page changes
  useEffect(() => {
    setNewData([]); // Clear data when switching tabs
    setPage(1); // Reset to the first page
    setHasMore(true); // Reset the "load more" state
    fetchData(currentTab, 1); // Fetch data for the active tab
  }, [currentTab, fetchData]);

  // Handle tab click
  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  // Handle "load more" button click
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(currentTab, nextPage);
    }
  };

  return (
    <div className="container container-max mt-3 mb-2 main-page">
      <div className="row borderB">
        <div className="col-12 borderB d-flex" style={{ padding: "0px" }}>
          <button
            style={{borderBottom:"none"}} className={`border border-dark rounded-top btn btn-event ${currentTab === "upcoming" ? "active-tab bg-black text-white" : ""}`}
            onClick={() => handleTabClick("upcoming")}
          >
            <h1 className="fw-bold py-1 h6">Upcoming Events</h1>
          </button>
          <button
             style={{borderBottom:"none"}} className={`border border-dark rounded-top btn btn-event ms-3 ${currentTab === "past" ? "active-tab bg-black text-white" : ""}`}
            onClick={() => handleTabClick("past")}
          >
            <h1 className="fw-bold py-1 h6">Past Events</h1>
          </button>
        </div>
        <div className="col-12 container" style={{ overflow: "hidden", minHeight: "700px" }}>
          <div className="mainSecondBox mt-1">
            {newData.length === 0 ? (
              <div className="text-center mt-5">
                <h4>No events have been posted yet.</h4>
              </div>
            ) : (
              <div className="row g-3">
                {newData.map((item) => (
                  <div key={item.event_id} className="col-lg-4 col-md-6 col-12">
                    <a href={`/events/${item.event_slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <div className="event-card">
                        <DataComp
                          src={`${webPath}${item.event_banner}?width=${dataCompWidth}`}
                          srcSet={generateSrcSet(
                            `${webPath}${item.event_banner}`,
                            [150, 250, 300, 320, 500, 700, 1000, 1200]
                          )}
                          alt={item.event_title}
                          h2Title={
                            <h2 className="event-title">{item.event_title}</h2>
                          }
                          post_location={
                            <div className="event-location">
                              <span className="fw-bold">{item.event_location}</span>
                              <span> | {new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric" }).format(new Date(item.event_date))}</span>
                            </div>
                          }
                          p_Desc={
                            <p className="event-description">
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
            )}
          </div>
          {hasMore && newData.length > 0 && (
            <div className="d-flex justify-content-center mt-3">
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
