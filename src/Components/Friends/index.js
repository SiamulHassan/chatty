import React, { useEffect, useState } from "react";
// css
import "./style.css";
import { Button } from "@mui/material";
// firebase
import { getDatabase, onValue, ref } from "firebase/database";
//redux
import { useSelector } from "react-redux";
const Friends = () => {
  ///////////////////////////////////
  // CURRENT USER
  const currentUser = useSelector((user) => user.logIn.login);

  /////////////////////////////////////
  // FIREBASE
  const db = getDatabase();
  /////////////////////////////////////
  // STATES
  const [friends, setFriends] = useState([]);
  /////////////////////////////////////
  // FETCHING FRIENDS
  useEffect(() => {
    const fetchFriends = ref(db, "friends");
    onValue(fetchFriends, (snapshot) => {
      let friendArr = [];
      snapshot.forEach((acceptedFriends) => {
        // current user hoy 'acceptedFriends' er sender or receiver hote hobe. mane sender ar receiver holei tata friends dekte pabe
        const currSenderNotRec =
          currentUser.uid === acceptedFriends.val().senderID &&
          currentUser.uid !== acceptedFriends.val().receiverID;
        const currRecNotSender =
          currentUser.uid === acceptedFriends.val().receiverID &&
          currentUser.uid !== acceptedFriends.val().senderID;
        if (currSenderNotRec || currRecNotSender) {
          friendArr.push({
            ...acceptedFriends.val(),
            friendRefKey: acceptedFriends.key,
          });
        }
      });
      setFriends(friendArr);
    });
  }, [db, currentUser.uid]);
  // console.log("friend", friends);
  return (
    <>
      <div className="friend-block_box">
        <h3 className="friend-block_heading">Friends</h3>
        {friends &&
          friends.map((friend, key) => (
            <div className="friend-block_container" key={key}>
              <div className="friend-block-profile_part">
                <div className="friend-block-profile">
                  {currentUser.uid === friend.senderID ? (
                    <picture>
                      <img
                        src={friend.receiverProfile || "./images/avatar.png"}
                        onError={(e) => (e.target.sec = "./images/avatar.png")}
                        alt="avatar"
                      />
                    </picture>
                  ) : (
                    <picture>
                      <img
                        src={friend.senderProfile || "./images/avatar.png"}
                        onError={(e) => (e.target.sec = "./images/avatar.png")}
                        alt="avatar"
                      />
                    </picture>
                  )}
                </div>
                <div className="friend-block-profile_name">
                  {currentUser.uid === friend.senderID ? (
                    <h4>{friend.receiverName}</h4>
                  ) : (
                    <h4>{friend.senderName}</h4>
                  )}
                </div>
              </div>
              <div className="btn_part">
                <div>
                  <Button
                    type="button"
                    className="group-btn"
                    variant="contained"
                  >
                    Block
                  </Button>
                </div>
                <div>
                  <Button
                    type="button"
                    className="btn--unfriend"
                    variant="contained"
                  >
                    Unfriend
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Friends;
