import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import TextHeader from "./TextHeader";
import { API_ROOT,webPath } from "../../apiConfig";

const sectionsLatest = [
  { title: "News", key: "newsData" },
  { title: "QuickBytes", key: "quickByteData" },
];

const sectionsLeadership = [
  { title: "Podcasts", key: "podcastData" },
  { title: "Featured Interview", key: "inteviewData" },
  { title: "Guest Posts", key: "guestPostData" },
];

const sectionsFeatures = [
  { title: "Articles", key: "articleData" },
  { title: "Future Ready", key: "futureReadyData" },
  { title: "Learning Center", key: "learningData" },
];

const DropComp = React.memo(({ className, section, handleSectionClick, maxItems }) => {
  const { cat_slug } = useParams();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [headerData, setHeaderData] = useState({
    latest: {},
    leadership: {},
    features: {},
  });

  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(section);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const [latestResponse, leadershipResponse, featuresResponse] = await Promise.all([
          fetch(`${API_ROOT}/api/post/latestPost`),
          fetch(`${API_ROOT}/api/post/leadership`),
          fetch(`${API_ROOT}/api/post/featured`),
        ]);

        const [latestData, leadershipData, featuresData] = await Promise.all([
          latestResponse.json(),
          leadershipResponse.json(),
          featuresResponse.json(),
        ]);

        setHeaderData({ latest: latestData, leadership: leadershipData, features: featuresData });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const renderSection = useCallback((sectionData, sections) => {
    return sections.map((section, sectionIndex) => {
      const sectionUrl = `/topic/${sectionData[section.key]?.[0]?.cat_slug || cat_slug}`;
      const columnClass = activeSection === "Latest" ? "col-md-6" : "col-md-4";
      const sectionClass = isMobile ? "col-12 col-6" : `col-12 ${columnClass} section-line`;

      return (
        <div key={sectionIndex} className={sectionClass}>
          {isMobile ? (
            <>
              <a
                href={sectionUrl}
                style={{ textDecoration: "none", color: "black" }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = sectionUrl; 
                }}
              >
                <p className="section-title pt-1">{section.title}</p>
              </a>
              <p className="see-more mt-2 mb-2" style={{ display: "none" }}>
                <a className='latest-anchor' style={{ textDecoration: "none", color: "black" }} href={sectionUrl}>
                  See More
                </a>
              </p> 
            </>
          ) : (
            <>
              <p className="section-title mt-1">{section.title}</p>
              {sectionData[section.key]?.slice(0, maxItems).map((x, i) => (
                <React.Fragment key={i}>
                  <a href={`/${x.cat_slug}/${x.post_name}`} style={{ textDecoration: "none", color: "black" }}>
                    <TextHeader
                    alt={x?.post_name}
                      headerImg={`${webPath}${x?.banner_img}?width=300`}
                      headerText={x?.post_title}
                      headerDesc={x?.post_author}
                      headerDescClass="header-desc"
                      post_date={x?.post_date}
                    />
                  </a>
                  <p className="mt-2 section-line"></p>
                </React.Fragment>
              ))}
              <p className="see-more mt-2 mb-2">
                <a className='latest-anchor' style={{ textDecoration: "none", color: "black" }} href={sectionUrl}>
                  See More
                </a>
              </p>
            </>
          )}
        </div>
      );
    });
  }, [maxItems, cat_slug, isMobile, activeSection]);

  const renderedSections = useMemo(() => {
    if (loading) {
      return null; 
    }

    if (error) {
      return <p style={{ color: 'red' }}>Error: {error}</p>; // Display error message
    }

    switch (section) {
      case "Latest":
        return renderSection(headerData.latest, sectionsLatest);
      case "Leadership":
        return renderSection(headerData.leadership, sectionsLeadership);
      case "Features":
        return renderSection(headerData.features, sectionsFeatures);
      default:
        return null;
    }
  }, [headerData, section, renderSection, loading, error]);

  useEffect(() => {
    setActiveSection(section);
  }, [section]);

  return (
    <div className={`container LatestData ${className}`}>
      <div className="row">
        {renderedSections}
      </div>
    </div>
  );
});

export default React.memo(DropComp);
