import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, React } from "react";
import "./Todos.css";
import "./Login.css";

export function Todos({ name, id }) {
  const [userTodos, setUserTodos] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState("serial"); // to  track of the selected sorting criterion

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}/todos`
        );
        if (!response.ok) {
          throw new Error("Request failed of todos");
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

  const handleCheckboxChange = (todoId) => {
    setUserTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed, // Toggle the completed state
          };
        }
        return todo;
      });
    });
  };

  const handleSortingChange = (event) => {
    // the function is created to update the sortingCriteria state when the select value changes
    setSortingCriteria(event.target.value);
  };

  const sortUserTodos = () => {
    // the function return a sorted copy of the userTodos array based on the selected sorting criteria
    const sortedTodos = [...userTodos];

    if (sortingCriteria === "serial") {
      // return negative if a need to be sort befor b ,
      // positive value if a need to be sort after b ,
      // or 0 if a and b are considered equal in terms of sorting order
      sortedTodos.sort((a, b) => a.id - b.id);
    } else if (sortingCriteria === "performance") {
      sortedTodos.sort((a, b) => a.completed - b.completed);
    } else if (sortingCriteria === "alphabetical") {
      sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingCriteria === "random") {
      sortedTodos.sort(() => Math.random() - 0.5); // will return number between 0.5 to -0.5 , and do a sort on that
    }

    return sortedTodos;
  };

  const sortedUserTodos = sortUserTodos();

  return (
    <div className="todos_container">
      {/* the headLine of the page */}
      <h1 className="todos_header">{`${name}`}`s Todos List:</h1>
      {/* the select tag */}
      <div className="sorting_section">
        <label htmlFor="sortingCriteria">Sort by:</label>
        <select
          id="sortingCriteria"
          value={sortingCriteria}
          onChange={handleSortingChange}
        >
          <option value="serial">Serial</option>
          <option value="performance">Performance</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
      </div>
      {/* print the todos list */}
      {userTodos.length > 0 ? (
        <ol className="todos_list_user">
          {sortedUserTodos.map((todo) => (
            <li className="" key={todo.id}>
              {todo.title}
              <input
                className="checkBox"
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.id)}
              />
            </li>
          ))}
        </ol>
      ) : (
        <p className="loading_message"> Loading...</p>
      )}
    </div>
  );
}
