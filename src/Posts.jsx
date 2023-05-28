import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, React } from "react";
import "./Posts.css";

export function Posts({ name, id }) {
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userPostsComments, setUserPostsComments] = useState([]);
  const [commentsFlag, setCommentsFlag] = useState(false);
  const [selectedPostFlag, setSelectedPostFlag] = useState(false);
  const [count, setCount] = useState(0);

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
    setSelectedPostFlag(!selectedPostFlag);
  };

  const getPostTitleStyle = (postId) => {
    if (selectedPost === postId && selectedPostFlag) {
      return {
        fontWeight: "bold",
        color: "red",
      };
    } // selectedPostFlag  is false
    return {
      fontWeight: "normal",
      color: "black",
    };
  };

  const getPostBodyStyle = (postId) => {
    if (selectedPost === postId && selectedPostFlag) {
      return {
        fontWeight: "bold",
        color: "blue",
      };
    } // selectedPostFlag  is false
    return {
      fontWeight: "normal",
      color: "black",
    };
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
              <div className="titleAndBodyPost">
                <h4 style={getPostTitleStyle(post.id)}>
                  {" "}
                  <a style={{ textDecorationLine: "underline" }}> Title:</a>
                  <a> </a>
                  {post.title}
                </h4>
                <p style={getPostBodyStyle(post.id)}>
                  <a style={{ textDecorationLine: "underline" }}> Body:</a>
                  <a> </a>
                  {post.body}
                </p>
              </div>
              <button
                className="selectButton"
                onClick={() => handlePostSelection(post.id)}
              >
                Select
              </button>
              <button
                className="commentsButton"
                onClick={() => requestComments(post.id)}
              >
                show comments
              </button>
              {commentsFlag && userPostsComments.length > 0 && (
                <ul className="comments_list_user">
                  {userPostsComments.slice(0, 10).map((comment) => (
                    <li className="comment" key={comment.id}>
                      <a style={{ textDecorationLine: "underline" }}> body:</a>{" "}
                      {comment.body} <br />
                      <a style={{ textDecorationLine: "underline" }}>
                        {" "}
                        name:
                      </a>{" "}
                      {comment.name} <br />
                      <a style={{ textDecorationLine: "underline" }}>
                        {" "}
                        email:
                      </a>{" "}
                      {comment.email}
                    </li>
                  ))}
                </ul>
              )}
            </span>
          ))}
        </div>
      ) : (
        <p className="loading_message">Loading...</p>
      )}
    </div>
  );
}
