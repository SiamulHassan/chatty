// importing useState
import React, { useEffect, useState } from "react";
//icons
import { AiOutlineCloudUpload } from "react-icons/ai";
import { SlLogout } from "react-icons/sl";
// css
import "./style.css";
//components
import SidebarIcon from "./sidebarIcon";
import SidebarModal from "../Modal/Modal";
// firebase
import { getAuth, signOut } from "firebase/auth";
//react dom
import { useNavigate } from "react-router-dom";
// dispatch action and redux
import { useDispatch, useSelector } from "react-redux";
import { loginReducer } from "../../Slice/loginSlice";

const Sidebar = () => {
  // current user
  const currentUser = useSelector((user) => user.logIn.login);
  //dispatch
  const dispatch = useDispatch();
  // modal
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };
  // navigate
  const navigate = useNavigate();
  const auth = getAuth();
  // sign out
  const handleSingOut = () => {
    signOut(auth).then(() => {
      // local storage theke remove hobe but redux theke remove hobe na
      localStorage.removeItem("chattyUsers");
      dispatch(loginReducer(null));
      navigate("/login");
    });
  };

  return (
    <>
      <nav className="nav">
        <div className="profile_wrapper">
          <div className="profile" onClick={handleModalOpen}>
            <picture>
              {/* akdom surute profile jokhon kw upload kore nai tokhon photoURL null thake 'currentUser.photoURL' null, so "./images/avatar.png" ata dekhabe But je akbar phot upload korche tar always photURL e url thakbe but seta valid jodi firebase theke delet na koro AR valid na jodi delet koro  */}
              {/* akhon delet korle error ashbe>> onError lagbe cause firebase theke photo delet kore dile redux e photoURl error pabe ar sei error er jonno onError use kore default pic dea hiose */}
              {/* tar mane akhane || "./images/avatar.png" ai part use hoise only akdom shuru handle korar jonno */}
              <img
                src={currentUser.photoURL || "./images/avatar.png"}
                onError={(e) => (e.target.src = "./images/avatar.png")}
                alt="profile_pic"
              />
            </picture>
            <div className="profile_overlay">
              <AiOutlineCloudUpload />
            </div>
          </div>
          <div className="displayName">
            <p>{currentUser.displayName}</p>
          </div>
        </div>
        <div className="menu">
          <SidebarIcon />
        </div>
        <div className="logout">
          <SlLogout onClick={handleSingOut} />
        </div>
      </nav>
      <SidebarModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Sidebar;
