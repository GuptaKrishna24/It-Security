import React from "react";

import TextCard from "../../Component/TextCard";
import { webPath } from "../../apiConfig";

const LearningComp = ({ data }) => {
  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <h5 className="fw-bold borderB py-1 h4">Learning Center</h5>

          {data && data.length > 0 ? (
            <>
              {" "}
              {data?.slice(0, 3).map((item) => (
                <div className="col-md-4 mt-4" key={item.id}>
                  <a
                    href={`/${item.cat_slug}/${item.post_name}`}
                    class="d-flex w-100"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ width: "50%" }}>
                      <img
                        src={`${webPath}${item?.banner_img}`}
                        alt={item?.post_name}
                        style={{
                          width: "92%",
                          height: "130px",
                          objectFit: "cover",
                          borderRadius: "14px",
                        }}
                      />
                    </div>
                    <div style={{ width: "50%" }}>
                      <TextCard
                        title={item?.post_title}
                        post_date={item?.post_date}
                        post_author={item?.post_author}
                      />
                    </div>
                  </a>
                </div>
              ))}
            </>
          ) : (
            <div className="mt-2">
              <h5>No Posts Available</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningComp;
