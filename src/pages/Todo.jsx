import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      navigate("/signin");
    } else {
      fetchTodos(access_token);
    }
  }, [navigate]);

  const fetchTodos = async (access_token) => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setTodos(data);
      } else {
        console.log("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error occurred while fetching todos:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() === "") {
      return;
    }

    const access_token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: newTodo,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        setTodos([...todos, data]);
        setNewTodo("");
      } else {
        console.log("Failed to add todo");
      }
    } catch (error) {
      console.error("Error occurred while adding todo:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>투두 리스트</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" />
              <span>{todo.todo}</span>
            </label>
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          data-testid="new-todo-input"
        />
        <button onClick={handleAddTodo} data-testid="new-todo-add-button">
          추가
        </button>
      </div>
    </div>
  );
};

export default Todo;
