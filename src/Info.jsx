import React, { useState, useEffect } from "react";
import "./Info.css";

// import icons from fa fa icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faIconName } from "@fortawesome/free-solid-svg-icons";
import {
  faHome,
  faUser,
  faIdCard,
  faEnvelope,
  faPhone,
  faGlobe,
  faBuilding,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const Info = ({ username }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = () => {
      fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`)
        .then((response) => response.json())
        .then((user) => {
          if (user.length > 0) {
            setUserInfo(user[0]);
          } else {
            setUserInfo({});
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          setUserInfo({});
        });
    };

    fetchUserInfo();
  }, [username]);

  return (
    <div className="container">
      <h2 className="title">User Information</h2>
      <div className="info-item">
        <FontAwesomeIcon className="custom-icon" icon={faHome} />
        <span className="info-label">Username:</span>
        <span className="info-value">{userInfo.username}</span>
      </div>
      <div className="info-item">
        <FontAwesomeIcon className="custom-icon" icon={faUser} />
        <span className="info-label">Name:</span>
        <span className="info-value">{userInfo.name}</span>
      </div>
      <div className="info-item">
        <FontAwesomeIcon className="custom-icon" icon={faIdCard} />
        <span className="info-label">User ID:</span>
        <span className="info-value">{userInfo.id}</span>
      </div>
      <div className="info-item">
        <FontAwesomeIcon className="custom-icon" icon={faEnvelope} />
        <span className="info-label">Email:</span>
        <span className="info-value">{userInfo.email}</span>
      </div>
      <div className="info-item">
        <FontAwesomeIcon className="custom-icon" icon={faPhone} />
        <span className="info-label">Phone:</span>
        <span className="info-value">{userInfo.phone}</span>
      </div>
      <div className="info-item">
        <FontAwesomeIcon className="custom-icon" icon={faGlobe} />
        <span className="info-label">Website:</span>
        <span className="info-value">{userInfo.website}</span>
      </div>
      <div className="info-item">
        <FontAwesomeIcon className="custom-icon" icon={faBuilding} />
        <span className="info-label">Address:</span>
        <span className="info-value">
          {userInfo.address?.street}, {userInfo.address?.city}
        </span>
      </div>
      <div className="info-item">
        <FontAwesomeIcon className="custom-icon" icon={faBriefcase} />
        <span className="info-label">Company Name:</span>
        <span className="info-value">{userInfo.company?.name}</span>
      </div>
    </div>
  );
};

export default Info;
