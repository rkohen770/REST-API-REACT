import "./Photos.css";
import { useState, useEffect } from "react";

function Photos() {
  const [userPhotos, setUserPhotos] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, steLoading] = useState(false);
  //   extract the album id from the URL
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    steLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${id}&&_limit=10&&_start=${count}`
    )
      .then((response) => response.json())
      .then((photos) => {
        setUserPhotos((prevPhotos) => [...prevPhotos, ...photos]);
        steLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user photos:", error);
        steLoading(false);
      });
  }, [id, count]);

  const handleLoadMore = () => {
    setCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="container">
      <h2 className="title">User Photos</h2>
      {Array.isArray(userPhotos) && userPhotos.length > 0 ? (
        <div className="photos-container">
          {userPhotos.map((photo) => (
            <div className="photo-Wrap" key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
          ))}
          <div className="load-more">
            <button
              ClassName="load-more-btn"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        </div>
      ) : (
        <p> No photos found.</p>
      )}
    </div>
  );
}

export default Photos;
