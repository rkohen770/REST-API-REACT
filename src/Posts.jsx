import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, React } from "react";
import "./Posts.css";

export function Posts({ name, id }) {
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userPostsComments, setUserPostsComments] = useState([]);
  const [commentsFlag, setCommentsFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}/posts`
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        // Process the received data
        console.log(data);
        setUserPosts(data);
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const requestComments = async (postId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${postId}/comments`
      );
      if (!response.ok) {
        throw new Error("Request failed of comments");
      }
      const data = await response.json();
      // Process the received data
      console.log(data);
      setUserPostsComments(data);
      if (commentsFlag) {
        setCommentsFlag(false);
      } else {
        setCommentsFlag(true);
      }
    } catch (error) {
      // Handle any errors
      console.error("Error:", error);
    }
  };

  const handlePostSelection = (postId) => {
    setSelectedPost(postId);
  };

  return (
    <div className="posts_container">
      {/* the headline of the page */}
      <h1 className="posts_header">{`${name}'s Posts List:`}</h1>
      {/* print the posts list */}
      {userPosts.length > 0 ? (
        <div className="posts_list_user">
          {userPosts.map((post) => (
            <span className="posts" key={post.id}>
              <h4>{post.title}</h4>
              {post.body}
              <br></br>
              <button
                className="commentsButton"
                onClick={() => requestComments(post.id)}
              >
                show comments
              </button>
              {commentsFlag && userPostsComments.length > 0 && (
                <ul className="comments_list_user">
                  {userPostsComments.slice(0, 10).map((comment) => (
                    <li className="" key={comment.id}>
                      name: {comment.name} <br></br>
                      email: {comment.email} <br></br>
                      body: {comment.body}
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="selectButton"
                onClick={() => handlePostSelection(post.id)}
              >
                Select
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="loading_message">Loading...</p>
      )}
    </div>
  );
}
