import React, { useEffect, useState, useCallback } from "react";
import "../Styles/Podcast.css";
import { CardComp } from "../Component/CardComp";
import axios from "axios";
import { API_ROOT , webPath } from "../apiConfig";
import { useMediaQuery } from "react-responsive";


const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const PodcastComp = ({ order }) => {

  const [data, setData] = useState(
    []
  );

  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const dataCompWidth = isLargeScreen ? 500 : 200;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_ROOT}/api/post/homepodcast`
      );
      const fetchedData = response.data;

     
      setData(fetchedData);
      // const localData = localStorage.getItem("podcastData");

  
      // if (JSON.stringify(fetchedData) !== localData) {
     
      //   localStorage.setItem("podcastData", JSON.stringify(fetchedData));
     
      // } else {
      //   // If the data matches, use the data from local storage
      //   // console.log("Data retrieved from localStorage.");
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
   
    fetchData();

   
    // const intervalId = setInterval(fetchData, 10000);


    // return () => clearInterval(intervalId);
  }, [fetchData]);

  if (!data.length) return null; 

  return (
<>
    {data && data.length > 0 && (
      <div className="container container-max mt-5 mb-5">
      <div className="row">
        <h3 className="fw-bold borderB py-1 h4">
          {order ? "Guest Author" : "Podcast"}
        </h3>

        <div className={`col-md-7 col-12 m-auto ${order ? "order-md-2" : ""}`}>
          <a
            className="a-link text-black"
            href={`/${data[0]?.cat_slug}/${data[0]?.post_name}`}
          >
            <h5 className="h1 fw-bold hoverHead">{data[0]?.post_title}</h5>
            <p className="postag">{stripHtmlTags(data[0]?.post_content)}</p>

            
            <button className="podBtn mt-2">Hear The Podcast</button>
          </a>
        </div>

        <div className={`col-md-5 col-12 m-auto mt-3 ${order ? "order-md-1" : ""}`}>
        <a
            className="a-link text-black"
            href={`/${data[0]?.cat_slug}/${data[0]?.post_name}`}
          >
          <CardComp
            src={`${webPath}${data[0]?.banner_img}?width=${dataCompWidth}`}
            alt={data[0]?.post_name}
            loading="lazy"
          />
              </a>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default React.memo(PodcastComp);
