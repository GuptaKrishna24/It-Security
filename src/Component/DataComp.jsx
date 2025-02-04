import React from "react";

export const DataComp = React.memo(
  ({
    src,
    alt,
    ee,
    h2Title,
    p_Desc,
    post_author,
    post_location,
    post_date,
    withZoom,
    loading,
    srcSet,
  }) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return (
      <div
        className={ee}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <figure className={withZoom ? "image-container" : ""}>
          <img
            src={src}
            srcSet={srcSet}
            className="homeImg"
            alt={alt}
            width="500"
            height="500"
            loading={loading}
          />
        </figure>
        <div>
          <p
            style={{ fontWeight: "600" }}
            className="h4 hoverHead line-clamp"
          >
            {h2Title}
          </p>
          {(post_author || post_location) && ( // Check if either post_author or post_location exists
            <p style={{ fontSize: "13px" }}>
              {post_author && (
                <>
                  By <span className="fw-bold">{post_author}</span>
                </>
              )}
              {post_author && post_location || " | "}
              {post_location && <>{post_location}</>}
              {post_date &&
                "" + new Date(post_date).toLocaleDateString(undefined, options)}
            </p>
          )}
          <p
            className="just-text line-clamp mt-1"
            style={{ fontSize: "13px" }}
          >
            {p_Desc}
          </p>
        </div>
      </div>
    );
  }
);
