import React from "react";

export function CardComp({ src, alt,cardImg }) {
  return (
    <>
      <img
        src={src}
        className={`homeImg ${cardImg}`}
        alt={alt}
        width="640"
        height="360"
        loading="lazy"
      />
    </>
  );
}
