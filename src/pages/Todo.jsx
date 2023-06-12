import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");
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

  const handleToggleComplete = async (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleEditTodo = (todoId) => {
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    setEditingTodoId(todoId);
    setEditingTodoText(todoToEdit.todo);
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
            {editingTodoId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={(e) => setEditingTodoText(e.target.value)}
                  data-testid="modify-input"
                />
                <button
                  //   onClick={() => handleSubmitEdit(todo.id)}
                  data-testid="submit-button"
                >
                  제출
                </button>
                <button
                  // onClick={handleCancelEdit}
                  data-testid="cancel-button"
                >
                  취소
                </button>
              </div>
            ) : (
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                  <span>{todo.todo}</span>
                </label>
                <button
                  onClick={() => handleEditTodo(todo.id)}
                  data-testid="modify-button"
                >
                  수정
                </button>
                <button
                  //   onClick={() => handleDeleteTodo(todo.id)}
                  data-testid="delete-button"
                >
                  삭제
                </button>
              </>
            )}
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
