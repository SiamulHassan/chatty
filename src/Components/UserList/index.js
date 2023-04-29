import React, { useEffect, useState } from "react";
// css
import "./style.css";
import Search from "../Search";
import { Button } from "@mui/material";
// firebase
import { getDatabase, onValue, ref, set } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";
const UserList = () => {
  // current user
  const currentUser = useSelector((user) => user.logIn.login);
  // handle cancle
  const handleCancel = () => {};
  // handle request
  const handleRequest = () => {};
  // firbase auth
  const db = getDatabase();
  const storage = getStorage();
  /////////////////////////////////////////
  /// FETCHING UERS
  const [userList, setUserList] = useState([]);
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
              setUserList([...userArr]);
            });
        }
      });
    });
  }, [db, currentUser.uid, storage]);
  // console.log("state", userList);
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
                {/* <Button
              type="submit"
              className="group-btn"
              variant="contained"
              onClick={handleCancel}
            >
              Cancel Request
            </Button> */}

                <Button
                  type="submit"
                  className="group-btn"
                  variant="contained"
                  onClick={() => handleRequest}
                >
                  Sent Request
                </Button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserList;
