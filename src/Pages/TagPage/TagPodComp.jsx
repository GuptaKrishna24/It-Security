import React from 'react'
import { webPath } from "../../apiConfig";
import { CardComp } from '../../Component/CardComp';
import { useMediaQuery } from "react-responsive";

function TagPodComp({data,order}) {
  
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const dataCompWidth = isLargeScreen ? 500 : 200;
    return (
        <>

          <div className="container mt-3  container-max">
          <div className="row">
          <h5 className="fw-bold borderB py-1 h4">
          {order ? "Guest Author" : "Podcast"}
        </h5>
    
            <div className="mainSecondBox mt-3">
            {data && data.length > 0 ? (
            <div className="row">
              <div className={`col-md-7 m-auto ${order ? "order-md-2" : ""}`}>
                <a
                  className="a-link text-black"
                  href={`/${data[0]?.cat_slug}/${data[0]?.post_name}`}
                >
                  <h5 className="h1 fw-bold hoverHead">{data[0]?.post_title}</h5>
                  <p>{data[0]?.post_content}</p>
                  <button className="podBtn mt-2">Hear The Podcast</button>
                </a>
              </div>

              <div className={`col-md-5 m-auto mt-3 ${order ? "order-md-1" : ""}`}>
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
          ) : (
            <div className="mt-3">
              <h5>No Posts Available</h5>
            </div>
          )}
            </div>
          </div>
        </div>
    
          
        </>
      );
}

export default TagPodComp