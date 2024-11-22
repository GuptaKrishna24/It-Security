import React from "react";

const FutureReadyComp = ({ data }) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <div>
 
      <div className="container mt-5">
      <div className="row borderB">
        <h5 className="fw-bold borderB py-1 h4">Future Ready</h5>
        {data && data.length > 0 ? (
          data.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="col-md-6 borderR paddings mt-3 mb-4"
              style={{ padding: "10px", fontSize: "14px" }}
            >
              <a
                style={{ textDecoration: "none", color: "black" }}
                href={`/${item.cat_slug}/${item.post_name}`}
              >
                <h5 className="fw-bold h2 hoverHead">{item?.post_title}</h5>
              </a>
              <p className="mt-1" style={{ fontSize: "13px" }}>
                By <span className="fw-bold">{item.post_author}</span> |{" "}
                {new Date(item.post_date).toLocaleDateString(undefined, options)}
              </p>
            </div>
          ))
        ) : (
          <div className="mt-3">
            <h5>No Posts Available</h5>
          </div>
        )}
      </div>
    </div>

    
    </div>
  );
};

export default FutureReadyComp;
