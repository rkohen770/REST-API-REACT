import "./Albums.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Albums({ name, id }) {
  const [userAlbums, setUserAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}/albums`
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        // Process the received data
        console.log(data);
        setUserAlbums(data);
        // renderResponse();
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container">
      <h2 className="title">User Albums</h2>
      <div className="albums">
        {userAlbums.map((album) => (
          <div className="album" key={album.id}>
            <Link to={`/albums/${album.id}/photos`} className="album-link">
              {album.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Albums;
