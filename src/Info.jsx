import React, { useState, useEffect } from 'react';

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
          console.error('Error fetching user info:', error);
          setUserInfo({});
        });
    };

    fetchUserInfo();
  }, [username]);

  return (
    <div>
      <h2>User Information</h2>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      {/* Display other properties as needed */}
    </div>
  );
};

export default Info;