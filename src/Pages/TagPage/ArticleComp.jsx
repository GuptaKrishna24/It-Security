import React from "react";

import { DataComp } from "../../Component/DataComp";
import { webPath } from "../../apiConfig";



export function ArticleComp({ data }) {
  return (
    <>
 
      <div className="container mt-3  container-max">
      <div className="row">
        <h5 className="fw-bold borderB py-1 h4">News</h5>

        <div className="mainSecondBox mt-3">
            <div className="row">
              {data && data.length > 0 ? (
                data?.slice(0, 3).map((item) => (
                  <div key={item.id} className="col-md-4 col-12">
                    <a className="a-link text-black" href={`/${item.cat_slug}/${item.post_name}`}>
                      <DataComp
                        src={`${webPath}${item.banner_img}?width=500`}
                        alt={item.post_name}
                        h2Title={item.post_title}
                        p_Desc={item?.p_content}
                        post_author={item.post_author}
                        post_date={item.post_date}
                        withZoom={true}
                      />
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-center mt-2">
                  <h5>No  Posts Available</h5>

                </div>
              )}
            </div>

          </div>
      </div>
    </div>

      
    </>
  );
}
