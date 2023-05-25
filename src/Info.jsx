import React, { useState, useEffect } from "react";

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
        <span className="info-label">Username:</span>
        <span className="info-value">{userInfo.username}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Name:</span>
        <span className="info-value">{userInfo.name}</span>
      </div>
      <div className="info-item">
        <span className="info-label">User ID:</span>
        <span className="info-value">{userInfo.userId}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Email:</span>
        <span className="info-value">{userInfo.email}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Phone:</span>
        <span className="info-value">{userInfo.phone}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Website:</span>
        <span className="info-value">{userInfo.website}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Address:</span>
        <span className="info-value">
          {userInfo.address?.street}, {userInfo.address?.city}
        </span>
      </div>
      <div className="info-item">
        <span className="info-label">Zipcode:</span>
        <span className="info-value">{userInfo.address?.zipcode}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Geo:</span>
        <span className="info-value">
          {userInfo.address?.geo?.lat}, {userInfo.address?.geo?.lng}
        </span>
      </div>
      <div className="info-item">
        <span className="info-label">Company Name:</span>
        <span className="info-value">{userInfo.company?.name}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Catch Phrase:</span>
        <span className="info-value">{userInfo.company?.catchPhrase}</span>
      </div>
      <div className="info-item">
        <span className="info-label">BS:</span>
        <span className="info-value">{userInfo.company?.bs}</span>
      </div>
    </div>
  );
};

export default Info;
