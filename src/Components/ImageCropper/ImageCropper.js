import React from "react";
//importing css
import "./style.css";
const ImageCropper = ({ image, cropData, getCropData }) => {
  return (
    <div>
      image cropper
      {/* <Cropper
            ref={cropperRef}
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
          /> */}
    </div>
  );
};

export default ImageCropper;
