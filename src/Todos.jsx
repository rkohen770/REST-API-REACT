import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, React } from "react";

export function Todos({ name, id }) {
  // const { id} = useParams() ;
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}/todos`
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        // Process the received data
        console.log(data);
        setUserTodos(data);
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>{`${name}`}`s Todos List:</h1>
      {userTodos.length > 0 ? (
        <ol className="todos_list_user">
          {userTodos.map((todo, i) => (
            <li className="" key={todo.id}>
              {todo.title}
              <input type="checkbox" checked={todo.completed} />
            </li>
          ))}
        </ol>
      ) : (
        <p> Loading...</p>
      )}
    </>
  );
}
