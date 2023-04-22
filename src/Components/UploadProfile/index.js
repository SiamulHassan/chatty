import React, { createRef, useRef, useState } from "react";
// importing css
import "./style.css";

// importing cropper css
import "cropperjs/dist/cropper.css";
// importing icon
import { IoIosImages } from "react-icons/io";
import ImageCropper from "../ImageCropper/ImageCropper";
//firebase storage
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
// importing firebase auth
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginReducer } from "../../Slice/loginSlice";
const UploadProfile = ({ setOpen }) => {
  //current user
  const currentUser = useSelector((users) => users.logIn.login);

  const [image, setImage] = useState();
  // we do not need cropdata cause we are directly uploading cropped image to firebase
  // const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  // createRef takes data from <Cropper/> component
  // firebase storage
  const storage = getStorage();
  const storageRef = ref(storage, currentUser.uid);
  //firebase auth
  const auth = getAuth();
  // choose file
  const chooseFile = useRef();
  // dispatch
  const dispatch = useDispatch();
  // loading
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      // setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      // uploadURL in firebsae was message4 which means:::// message4:::  The first argument to the function is a reference to the location in the storage bucket where the string should be uploaded. The second argument is the string to be uploaded, which is in this case message4.
      // The third argument to uploadString() is the format of the data in the string being uploaded. In this case, the format is specified as data_url. This parameter tells Firebase Storage that the string being uploaded is in the data: URL format.
      setLoading(true);
      const uploadURL = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, uploadURL, "data_url").then((snapshot) => {
        //downloading uploaded img url
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setOpen(false);
            dispatch(loginReducer({ ...currentUser, photoURL: downloadURL }));
            localStorage.setItem(
              "chattyUsers",
              JSON.stringify({ ...currentUser, photoURL: downloadURL })
            );
            setLoading(false);
          });
        });
      });
    }
  };
  // drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    // value 'copy' means ... copy is allowed.when the item is dropped on the target, a copy of the data will be created at the drop location.
    e.dataTransfer.dropEffect = "copy";
  };
  const handleDrop = (e) => {
    e.preventDefault();
    onChange(e);
  };
  return (
    <>
      <div
        className="upload-box"
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragOver}
        onDrop={handleDrop}
      >
        {/* input is hidden because upload icon and input field both are showing. we want to click icon to open input file field...so we are gonna use useRef */}
        {/* userRef.current e akta click method ache ... ai method ta jekhane add korbe click korle ref er shathe attachted input open hobe >>> akhane ref ba useRef er shathe attachted holo input field ja hidden ache*/}
        <input type="file" hidden ref={chooseFile} onChange={onChange} />
        <div className="upload">
          <div
            className="upload-icon"
            onClick={() => chooseFile.current.click()}
          >
            <IoIosImages />
          </div>
          {image && (
            <ImageCropper
              image={image}
              setImage={setImage}
              cropperRef={cropperRef}
              getCropData={getCropData}
              loading={loading}
            />
          )}
          <p>Upload Photo</p>
        </div>
      </div>
    </>
  );
};

export default UploadProfile;
