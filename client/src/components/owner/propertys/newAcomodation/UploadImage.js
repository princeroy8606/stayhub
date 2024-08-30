import React, { useRef } from "react";

const UploadImage = ({ images, addImages }) => {
  const inputRef = useRef();
  const secondRef = useRef();
  
  const openFileUploader = () => {
    inputRef.current.click();
  };
  const openFileUploaderAgain = () => {
    if (secondRef.current) secondRef.current.click();
  };

  const handleChange = (e) => {
    const data = e.target.files;
    addImages(data);
  };
  return (
    <div className="acc-amenities-cnt">
      <h3>Add some photos of the house</h3>
      <p>You'll need 3 photos to get started</p>
      {images?.length !== 0 ? (
        <img alt="" src={URL.createObjectURL(images[0])} className="add-photo-btn" />
      ) : (
        <div className="add-photo-btn" onClick={openFileUploader}>
          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleChange}
            multiple={true}
          />
          <img
            src="https://www.svgrepo.com/show/158332/photos-selection.svg"
            alt=""
            className="upload-image-icon"
          />
          <p>Select minimum 3 photos</p>
          <h3>Select From Device</h3>
        </div>
      )}
      {images?.length > 0 ? (
        <div className="display-images-cnt">
          {images?.length > 1 && (
            <img
            alt=""
              src={URL.createObjectURL(images[1])}
              className="add-photo-btn flex-btn"
            />
          )}
          {images?.length < 3 ? (
            <div
              className="add-photo-btn flex-btn"
              onClick={openFileUploaderAgain}
            >
              <input
                type="file"
                ref={secondRef}
                style={{ display: "none" }}
                onChange={handleChange}
                multiple={true}
              />
              +
            </div>
          ) : (
            <img
            alt=""
              src={URL.createObjectURL(images[2])}
              className="add-photo-btn flex-btn"
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UploadImage;
