import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";

const Todo = () => {
  const [todos, setTodos] = useState([]);
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

  return (
    <div>
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
    </div>
  );
};

export default Todo;
