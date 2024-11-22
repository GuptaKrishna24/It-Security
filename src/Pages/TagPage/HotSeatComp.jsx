import React from "react";
import { CardComp } from "../../Component/CardComp";
import TextCard from "../../Component/TextCard";
import "../../Styles/TagPage/HotSeatComp.css"; 
import { webPath } from "../../apiConfig";

const HotSeatComp = ({data}) => {


  return (
    <div>

      <div className="container mt-5 container-max">
      <div className="row">
        <h5 className="fw-bold borderB py-1 h4">Hot Seats</h5>
        <div className="mainSecondBox mt-3">
          <div className="row">
          {data && data.length > 0 ? (
                  data.slice(0, 4).map((item) => (
                    <div key={item.id} className="col-md-6 mb-3">
                      <div className="article-item d-flex align-items-center gap-3">
                        <div className="image-container">
                        <a className="a-link text-black" href={`/${item.cat_slug}/${item.post_name}`}>
                          <CardComp src={`${webPath}${item?.banner_img}`} alt={item?.post_name} />
                          </a>
                        </div>
                        <div className="text-container mt-2">
                          <a className="a-link text-black" href={`/${item.cat_slug}/${item.post_name}`}>
                            <TextCard
                              title={item?.post_title}
                              desc={item?.p_content}
                              post_date={item?.post_date}
                              post_author={item?.post_author}
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mt-2">
                    <h5>No Posts Available</h5>
                  </div>
                )}


          </div>
        </div>
      </div>
    </div>

    </div>
    
  );
};

export default HotSeatComp;
