import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import TodoList from "../components/TodoList";

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

  const handleDeleteTodo = async (todoId) => {
    const access_token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status === 204) {
        setTodos(todos.filter((todo) => todo.id !== todoId));
      } else {
        console.log("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error occurred while deleting todo:", error);
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

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
  };

  const handleSubmitEdit = async (todoId) => {
    if (editingTodoText.trim() === "") {
      return;
    }

    const access_token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: editingTodoText,
          isCompleted: false, // 할 일 수정하면, 초기화
        }),
      });

      if (response.status === 200) {
        const updatedTodo = await response.json();
        const updatedTodos = todos.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo;
          }
          return todo;
        });
        setTodos(updatedTodos);
        setEditingTodoId(null);
        setEditingTodoText("");
      } else {
        console.log("Failed to update todo");
      }
    } catch (error) {
      console.error("Error occurred while updating todo:", error);
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
      <TodoList
        todos={todos}
        editingTodoId={editingTodoId}
        editingTodoText={editingTodoText}
        handleToggleComplete={handleToggleComplete}
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleCancelEdit={handleCancelEdit}
        handleSubmitEdit={handleSubmitEdit}
        setEditingTodoText={setEditingTodoText}
      />
    </div>
  );
};

export default Todo;
