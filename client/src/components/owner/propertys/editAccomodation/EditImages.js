import React, { useRef, useState } from "react";
import assets from "../../../../assets/assets";
import { useDispatch } from "react-redux";
import { editHouse } from "../../../../redux/features/actions/ownerActions";
import { useAuth } from "../../../../context/authContext";

const EditImages = ({ data, handleCancel }) => {
  const inputRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const [images, SetImages] = useState([]);
  const [activeInput, setAcitiveInput] = useState(false);

  const dispatch = useDispatch();
  const { userData } = useAuth();

  const openFileUploader = () => {
    inputRef.current.click();
  };

  const openFileUploaderSecond = () => {
    if (secondRef.current) secondRef.current.click();
  };

  const openFileUploaderThird = () => {
    if (thirdRef.current) thirdRef.current.click();
  };

  const handleChange = (e, index) => {
    const data = e.target.files;
    if (images.length > 0) {
      SetImages((prevdata) => {
        const updateImg = [...prevdata];
        updateImg[index] = data[0];
        return updateImg;
      });
    } else {
      SetImages([...data]);
    }
  };

  const handleSave = () => {
    if (images.length !== 0) {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("AccImages", image);
      });
      dispatch(
        editHouse({
          data: formData,
          AdminId: userData?._id,
          houseId: data?._id,
        })
      );
    }
  };

  return (
    <div className="popUp-block" style={{ position: "absolute", zIndex: 5 }}>
      <div className="cancel-btn" onClick={() => handleCancel()}>
        <img src={assets.Images.Cross} alt="Close" />
      </div>
      <div></div>
      <div className="acc-amenities-cnt edit-images-cnt">
        <h3>Add some photos of the house</h3>
        <p>Upload new Photos </p>
        <div className="add-photo-btn edit-photo-btn">
          {images?.length !== 0 ? (
            <img
              src={URL.createObjectURL(images[0])}
              className="add-photo-btn"
              onMouseOver={() => setAcitiveInput(true)}
            />
          ) : (
            <img
              src={`${process.env.REACT_APP_BASEURL}${data?.images[0]?.url}`}
              className="add-photo-btn edit-img"
              onMouseOver={() => setAcitiveInput(true)}
            />
          )}
          {activeInput && (
            <div
              className="add-photo-btn upload-photo-cnt"
              onClick={openFileUploader}
              onMouseLeave={() => setAcitiveInput(false)}
            >
              <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={(e) => handleChange(e, 0)}
                multiple={true}
              />
              <img
                src="https://www.svgrepo.com/show/158332/photos-selection.svg"
                alt="image"
                className="upload-image-icon"
              />
              <h3>Select New Image</h3>
            </div>
          )}
        </div>
        <div className="display-images-cnt">
          <div className=" add-photo-btn edit-img-display flex-btn">
            {images?.length < 3 ? (
              <img
                src={`${process.env.REACT_APP_BASEURL}${data?.images[1]?.url}`}
                className="add-photo-btn edit-img"
                onMouseOver={() => setAcitiveInput(true)}
              />
            ) : (
              <img
                src={URL.createObjectURL(images[1])}
                className="add-photo-btn"
                onMouseOver={() => setAcitiveInput(true)}
              />
            )}
            {activeInput && (
              <div
                className="upload-photo-cnt  "
                onClick={openFileUploaderSecond}
                onMouseLeave={() => setAcitiveInput(false)}
              >
                <input
                  type="file"
                  ref={secondRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleChange(e, 1)}
                  multiple={true}
                />
                <img
                  src="https://www.svgrepo.com/show/158332/photos-selection.svg"
                  alt="image"
                  className="upload-image-icon"
                />
                <h3>Select New Image</h3>
              </div>
            )}
          </div>
          <div className=" add-photo-btn edit-img-display flex-btn">
            {images?.length < 3 ? (
              <img
                src={`${process.env.REACT_APP_BASEURL}${data?.images[2]?.url}`}
                className="add-photo-btn edit-img"
                onMouseOver={() => setAcitiveInput(true)}
              />
            ) : (
              <img
                src={URL.createObjectURL(images[2])}
                className="add-photo-btn"
                onMouseOver={() => setAcitiveInput(true)}
              />
            )}
            {activeInput && (
              <div
                className="upload-photo-cnt  "
                onClick={openFileUploaderThird}
                onMouseLeave={() => setAcitiveInput(false)}
              >
                <input
                  type="file"
                  ref={thirdRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleChange(e, 2)}
                  multiple={true}
                />
                <img
                  src="https://www.svgrepo.com/show/158332/photos-selection.svg"
                  alt="image"
                  className="upload-image-icon"
                />
                <h3>Select New Image</h3>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="popup-footer-cnt">
        <div className="popup-footer-btn" onClick={handleSave}>
          Save
        </div>
      </div>
    </div>
  );
};

export default EditImages;
