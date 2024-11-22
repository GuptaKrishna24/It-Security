import React from "react";

function TextCard({ title, desc,post_author ,post_date}) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  return (
    <>
      <h2 className="fw-bold h5 hoverHead  mt-3">{title}</h2>

      <p style={{ fontSize: "13px" }}>
      By <span className="fw-bold">{post_author}</span> | {new Date(post_date).toLocaleDateString(undefined, options) }     
    </p>
    {desc && (
      <p className="just-text line-clamp mt-1" style={{ fontSize: "15px" }}>
        {stripHtmlTags(desc)}
      </p>
    )}
     
    </>
  );
}

export default React.memo(TextCard);
