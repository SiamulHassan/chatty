import React, { useEffect, useState } from "react";
// css
import "./style.css";
import { Button } from "@mui/material";
//redux
import { useSelector } from "react-redux";
//firebase
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
const BlockedUser = () => {
  //////////////////////////////////////////////
  // CURRENT USER
  const currentUser = useSelector((user) => user.logIn.login);
  //////////////////////////////////////////////
  // STATES
  const [blockedUsers, setBlockedUsers] = useState([]);
  //////////////////////////////////////////////
  // FIREBASE
  const db = getDatabase();
  //////////////////////////////////////////////
  // BLOCKED USERS
  useEffect(() => {
    const fetchBlockedUsers = ref(db, "blockedUsers");
    onValue(fetchBlockedUsers, (snapshot) => {
      let blockUserArr = [];
      snapshot.forEach((blockedUsers) => {
        if (
          (currentUser.uid === blockedUsers.val().blockerID &&
            blockedUsers.val().whoBlockedID !== currentUser.uid) ||
          (blockedUsers.val().whoBlockedID === currentUser.uid &&
            blockedUsers.val().blockerID !== currentUser.uid)
        ) {
          if (currentUser.uid === blockedUsers.val().blockerID) {
            // je current user -> je block hoise
            // whoBlocked holo -> receiver
            // blocker holo -> sender
            //receiver details dekhbe
            blockUserArr.push({
              blockUserRefKey: blockedUsers.key,
              whoBlockedName: blockedUsers.val().whoBlocked,
              whoBlockedID: blockedUsers.val().whoBlockedID,
              whoBlockedProfile: blockedUsers.val().whoBlockedProfile,
            });
          } else {
            //sender info dekhbe::blocker holo -> sender
            blockUserArr.push({
              blockUserRefKey: blockedUsers.key,
              blockerName: blockedUsers.val().blockerName,
              blockerID: blockedUsers.val().blockerID,
              blockerProfile: blockedUsers.val().blockerProfile,
            });
          }
        }
      });
      setBlockedUsers(blockUserArr);
    });
  }, [db, currentUser.uid]);
  ////////////////////////////////////////////////////
  /// HANDLE UNBLOCK
  const handleUnblock = (blockedUserData) => {
    // console.log("nb", blockedUserData);
    set(push(ref(db, "friends")), {
      // 'unblock' e click korle console korle only receiver info pabo. kono sender info pabo na...tar mane sender info hobe current user
      senderName: currentUser.displayName,
      senderID: currentUser.uid,
      senderProfile: currentUser.photoURL,
      receiverID: blockedUserData.whoBlockedID,
      receiverName: blockedUserData.whoBlockedName,
      receiverProfile: blockedUserData.whoBlockedProfile,
    }).then(() => {
      remove(ref(db, "blockedUsers/" + blockedUserData.blockUserRefKey));
    });
  };
  return (
    <>
      <div className="blockUser_box">
        <h3 className="blockUser_heading">Blocked Users</h3>
        {blockedUsers &&
          blockedUsers.map((blockedUser, key) => (
            <div className="blockUser_box_container" key={key}>
              <div className="blockUser_box_profile_part">
                <div className="blockUser_box_profile">
                  <picture>
                    <img
                      src={
                        blockedUser.whoBlockedProfile ??
                        blockedUser.blockerProfile
                      }
                      onError={(e) => (e.target.src = "./images/avatar.png")}
                      alt="av"
                    />
                  </picture>
                </div>
                <div className="blockUser_box_profile_name">
                  <h4>{blockedUser.whoBlockedName}</h4>
                  <h4>{blockedUser.blockerName}</h4>
                </div>
              </div>
              <div className="btn_part">
                {blockedUser.whoBlockedID && (
                  <Button
                    type="submit"
                    className="group-btn"
                    variant="contained"
                    onClick={() => handleUnblock(blockedUser)}
                  >
                    Unblock
                  </Button>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default BlockedUser;
