import React, { useEffect, useRef, useState,useCallback } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { API_ROOT , webPath } from "../apiConfig";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { useMediaQuery } from "react-responsive";

import { Swiper, SwiperSlide } from "swiper/react";




// const stripHtmlTags = (html) => {
//   const doc = new DOMParser().parseFromString(html, "text/html");
//   return doc.body.textContent || "";
// };

const stripHtmlTags = (html, defaultMessage = "No content available") => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body.textContent || "";
  return text.trim() === "" ? defaultMessage : text;
};

export function GuestComp() {
  const [guestData, setGuestData] = useState( []);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };


  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const dataCompWidth = isLargeScreen ? 500 : 200;


  const fetchGuestData = useCallback(async () => {
    try {

      const response = await axios.get(
        `${API_ROOT}/api/post/homeinterview`
      );
      const fetchedData = response.data;
  
      
      setGuestData(fetchedData);
      // const storedData = localStorage.getItem("guestData");
     
      // if (JSON.stringify(fetchedData) !== storedData) {
       
      //   localStorage.setItem("guestData", JSON.stringify(fetchedData)); 
      // } else {
        
      //   setGuestData(JSON.parse(storedData)); 
       
      // }
    } catch (error) {
      console.error("Error fetching guest data:", error);
    }
  }, []);
  
  useEffect(() => {
    
    fetchGuestData();

    // const intervalId = setInterval(fetchGuestData, 10000); 

   
    // return () => clearInterval(intervalId);

  }, [fetchGuestData]);


  // eslint-disable-next-line
  const [swiper, setSwiper] = useState(null);

  const navigationPrevRef = useRef();
  const navigationNextRef = useRef();

  return (
    <div>
      <h3 className="fw-bold py-1 h4 text-center container mt-5 container-max borderB">
        Guest Author
      </h3>

      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-md-12 swiperBox">
            <Swiper
              onSwiper={setSwiper}
              loop={true}
              className="mb-4"
              spaceBetween={10}
              slidesPerView={1}
              slidesPerGroup={1}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 10 },
                1199: { slidesPerView: 4, spaceBetween: 20 },
              }}
            >
              <Swiper spaceBetween={50} slidesPerView={3}>
                {guestData?.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="card">
                      <a
                        className="a-link text-black"
                        href={`/${item?.cat_slug}/${item?.post_name}`}
                      >
                        <img
                          src={`${webPath}${item?.banner_img}?width=${dataCompWidth}`}
                          alt={item.post_name}
                          loading="lazy"
                          width="auto"
                          height="auto"
                          style={{ width: "100%", height: "auto" }}
                        />
                        <div className="card-body" style={{ height: "157px" }}>
                          <h3 className="card-title h5  fw-bold hoverHead line-clamp">
                            {item?.post_title}
                          </h3>

                          <p
                            className="card-text mt-1"
                            style={{ fontSize: "13px" }}
                          >
                            By{" "}
                            <span className="fw-bold">{item?.post_author}</span>{" "}
                            |{" "}
                            {new Date(item.post_date).toLocaleDateString(
                              undefined,
                              options
                            )}
                          </p>
                          <p className="card-text mt-2 line-clamp">
                          

                            {stripHtmlTags(item?.post_content)}
                          </p>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
