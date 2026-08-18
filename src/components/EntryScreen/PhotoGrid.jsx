import React from "react";
import { ENTRY_PHOTOS } from "../../constants/entryPhotos";
const PhotoGrid = () => {
  return (
    <div className="masonry-grid" aria-hidden="true">
      {ENTRY_PHOTOS.map((photo, index) => (
        <div
          key={`${photo.src}-${index}`}
          className={`masonry-grid__item ${photo.className}`}
        >
          <img
            src={photo.src}
            alt=""
            loading={index < 5 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;