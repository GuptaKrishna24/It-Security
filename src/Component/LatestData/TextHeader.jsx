import React from "react";

function TextHeader({ headerImg, headerText, headerDesc ,headerDescClass,alt,post_date}) {
    
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
   
 console.log("post_date :",post_date)


   
  return (
    <div className="text-card gap-3" style={{ width: "100%" , flex:"1" }}>

    <div style={{width:"120px"}}>
    <img
        src={headerImg}
        alt={alt}
        loading="lazy"
        className="headerImg"
        width="120"
        height="80"
      />
    </div>
   
      <div className="main-text" style={{ width: "61%" }}>
        <h5 className="headerText fw-bold line-clamp">{headerText}</h5>
        <p className={`header-desc ${headerDescClass}`}  style={{fontSize:"13px",paddingBottom:"-10px",marginTop:"-20px"}}>
        By <span className="fw-bold">{headerDesc}</span> | {new Date(post_date).toLocaleDateString(undefined, options) }  
        </p>
      </div>
    </div>
  );
}

export default React.memo(TextHeader);