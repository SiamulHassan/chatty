import React from "react";
//importing css
import "./style.css";
//importing react cropper
import Cropper, { ReactCropperElement } from "react-cropper";
// importing close icon
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@mui/material";
const ImageCropper = ({ image, cropperRef, getCropData, setImage }) => {
  const handleBackImg = () => {
    setImage(null);
  };
  return (
    <>
      <div className="upload-img-box">
        <div className="upload-header">
          <h4>Upload Profile Picture</h4>
          <div className="close-icon" onClick={handleBackImg}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="preview-img">
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>
        <Cropper
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
        />
        <div className="upload-btn" onClick={getCropData}>
          <Button
            variant="contained"
            sx={{
              background: "#5f35f5ea",
              ":hover": {
                bgcolor: "#5f35f5cb",
              },
            }}
          >
            upload now
          </Button>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
