import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { forEach } from "draft-js/lib/DefaultDraftBlockRenderMap";

export function Todos({ name, userId }) {
  // const { id} = useParams() ;
  const [alltodos, setAllTodos] = useState([]);
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        // Process the received data
        console.log(data);
        setAllTodos(data);
        searchingUserTodos();
      } catch (error) {
        // Handle any errors
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const searchingUserTodos = () => {
    if (alltodos != []) {
      for (let i = 0; i < alltodos.length; i++) {
        if (userId <= alltodos[i].userId) {
          if (userId === alltodos[i].userId) {
            let temp = userTodos;
            temp.push(alltodos[i]);
            setUserTodos(temp);
          }
        } else {
          break;
        }
      }
    }
  };

  //fetchDataInner();

  return (
    <>
      <h1>{`${name}`}`s Todos List:</h1>
      <ol className="todos_list_user">
        {userTodos.map((todo, i) => (
          <li className="">
            {todo[i].title}
            <input type="checkbox" checked={todo[i].comleted} />
          </li>
        ))}
      </ol>
    </>
  );
}
