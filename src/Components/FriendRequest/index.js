import React, { useEffect, useState } from "react";
// css
import "./style.css";
import { Button } from "@mui/material";
// firebase
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
// redux
import { useSelector } from "react-redux";
// import Search from "../Search";
const FriendReq = () => {
  ////////////////// CURRENT USER
  const currentUser = useSelector((user) => user.logIn.login);
  ///////////////// STATES
  const [showFrndReq, setShowFrndReq] = useState([]);
  ///////////////// FIREBASE
  // firbase
  const db = getDatabase();
  ///////////////////////////////////////////
  /// FETCHING FRIEND REQUEST
  useEffect(() => {
    const fetchFriendRequest = ref(db, "friendRequest");
    onValue(fetchFriendRequest, (snapshot) => {
      const frndReqArr = [];
      snapshot.forEach((frndReqData) => {
        // jodi current user receiver hoy tahole e push korba
        const receiver = currentUser.uid === frndReqData.val().receiverID;
        if (receiver) {
          frndReqArr.push({
            ...frndReqData.val(),
            frendReqRefKey: frndReqData.key,
          });
        }
      });
      setShowFrndReq(frndReqArr);
    });
  }, [db, currentUser.uid]);
  //////////////////////////////////////////
  /// ACCEPT REQUEST
  const handleAccept = (frndReqData) => {
    set(push(ref(db, "friends")), {
      ...frndReqData,
    }).then(() => {
      remove(ref(db, "friendRequest/" + frndReqData.frendReqRefKey));
    });
  };
  //////////////////////////////////////////
  /// REJECT REQUEST
  const handleReject = (frndReqRefKey) => {
    remove(ref(db, "friendRequest/" + frndReqRefKey));
  };
  return (
    <>
      <div className="userlist_box">
        <h3 className="userlist_heading">Friend Request</h3>
        {/* <Search /> */}
        {showFrndReq &&
          showFrndReq.map((frndReq, key) => (
            <div className="friend_container" key={key}>
              <div className="friend_profile-part">
                <div className="friend-profile">
                  <picture>
                    <img
                      src={frndReq.senderProfile || "./images/avatar.png"}
                      onError={(e) => (e.target.src = "./images/avatar.png")}
                      alt="avatar"
                    />
                  </picture>
                </div>
                <div className="friend-profile_name">
                  <h4>{frndReq.senderName}</h4>
                </div>
              </div>
              <div className="btn_part">
                <div>
                  <Button
                    type="submit"
                    className="group-btn"
                    variant="contained"
                    onClick={() => handleAccept(frndReq)}
                  >
                    Accept
                  </Button>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="btn--reject"
                    variant="contained"
                    onClick={() => handleReject(frndReq.frendReqRefKey)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default FriendReq;
