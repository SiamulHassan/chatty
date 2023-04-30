import React, { useEffect, useState } from "react";
// css
import "./style.css";
import Search from "../Search";
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
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";
const UserList = () => {
  // current user
  const currentUser = useSelector((user) => user.logIn.login);
  // firbase
  const db = getDatabase();
  const storage = getStorage();
  ////////// STATES
  const [userList, setUserList] = useState([]);
  const [friendReq, setFriendReq] = useState([]);
  const [cancelFriendReq, setCancelFriendReq] = useState([]);
  /////////////////////////////////////////
  /// FETCHING UERS
  useEffect(() => {
    const fetchUsers = ref(db, "users");
    onValue(fetchUsers, (snapshot) => {
      let userArr = [];
      snapshot.forEach((userData) => {
        if (currentUser.uid !== userData.key) {
          getDownloadURL(storageRef(storage, userData.key))
            .then((url) => {
              userArr.push({
                ...userData.val(),
                usersRefKey: userData.key,
                photoURL: url,
              });
            })
            .catch((err) => {
              // profile pic upload na thakle error ashbe ar ei error er jonno data userArr te push hobe na [] ashbe. tai error pele photoURL null kore sei data pathacchi,aibar data push hobe
              userArr.push({
                ...userData.val(),
                usersRefKey: userData.key,
                photoURL: null,
              });
            })
            .then(() => {
              // prothom bar akta array te i 2ta obj akshathe ashe ([{..2ta obj..}]) jar jonno map hote pare na. tai protho e i jeno akta arry er moddhe 2ta obj seperated by comma akare ashe tai spread kora hoise.[{sakib},{raihan}]
              setUserList([...userArr]);
            });
        }
      });
    });
  }, [db, currentUser.uid, storage]);
  /////////////////////////////////////////////////
  // HANDLE REQUEST
  const handleRequest = (userData) => {
    // usersRefKey holo user create korar somoy je tar jonno unique id create hoy
    set(push(ref(db, "friendRequest")), {
      senderID: currentUser.uid,
      receiverID: userData.usersRefKey,
      senderName: currentUser.displayName,
      receiverName: userData.username,
      senderProfile: currentUser.photoURL,
      receiverProfile: userData.photoURL,
    });
  };
  /////////////////////////////////////////////////
  // SHOWING CANCEL BTN
  useEffect(() => {
    const fetchFriendRequest = ref(db, "friendRequest");
    onValue(fetchFriendRequest, (snapshot) => {
      let friendReqArr = [];
      snapshot.forEach((friendReqData) => {
        friendReqArr.push(
          friendReqData.val().senderID + friendReqData.val().receiverID
        );
      });
      setFriendReq(friendReqArr);
    });
  }, [db]);
  /////////////////////////////////////////////////
  // CANCEL REQUEST
  useEffect(() => {
    const fetchFriendRequest = ref(db, "friendRequest");
    onValue(fetchFriendRequest, (snapshot) => {
      let cancelFrndArr = [];
      snapshot.forEach((friendReqData) => {
        cancelFrndArr.push({
          ...friendReqData.val(),
          friendReqRefKey: friendReqData.key,
        });
      });
      setCancelFriendReq(cancelFrndArr);
    });
  }, [db]);
  const handleCancel = (ID) => {
    remove(ref(db, "friendRequest/" + ID));
  };

  return (
    <>
      <div className="userlist_box">
        <h3 className="userlist_heading">User List</h3>
        <Search />
        {userList &&
          userList.map((usersData, key) => (
            <div className="UserList_container" key={key}>
              <div className="UserList-profile_part">
                <div className="UserList-profile">
                  <picture>
                    <img
                      src={usersData.photoURL || "./images/avatar.png"}
                      alt="avatar"
                    />
                  </picture>
                </div>
                <div className="UserList-profile_name">
                  <h4>{usersData.username}</h4>
                </div>
              </div>
              <div className="btn_part">
                {friendReq.includes(currentUser.uid + usersData.usersRefKey) ||
                friendReq.includes(usersData.usersRefKey + currentUser.uid) ? (
                  <Button
                    type="submit"
                    className="group-btn"
                    variant="contained"
                    onClick={() =>
                      handleCancel(
                        cancelFriendReq.find(
                          (frnd) =>
                            currentUser.uid === frnd.senderID &&
                            usersData.usersRefKey === frnd.receiverID
                        )?.friendReqRefKey
                      )
                    }
                  >
                    Cancel Request
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="group-btn"
                    variant="contained"
                    onClick={() => handleRequest(usersData)}
                  >
                    Sent Request
                  </Button>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserList;
