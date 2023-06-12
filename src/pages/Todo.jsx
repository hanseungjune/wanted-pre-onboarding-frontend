import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import TodoList from "../components/TodoList";
import styles from "../styles/todo.module.css";

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

  // 할일 목록 불러오기
  const fetchTodos = async (access_token) => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setTodos(data);
      } else {
        console.log("리스트 가져오기 실패");
      }
    } catch (error) {
      console.error("리스트 가져오기 에러:", error);
    }
  };

  // 새로운 할일 입력 값 처리
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  // 할일 추가
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
        setTodos([...todos, data]);
        setNewTodo("");
      } else {
        console.log("리스트 추가하기 실패");
      }
    } catch (error) {
      console.error("리스트 추가하기 에러:", error);
    }
  };

  // 할일 삭제
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
        console.log("리스트 삭제하기 실패");
      }
    } catch (error) {
      console.error("리스트 삭제하기 에러:", error);
    }
  };

  // 할일 완료 상태 변경
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

  // 할일 수정 시작
  const handleEditTodo = (todoId) => {
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    setEditingTodoId(todoId);
    setEditingTodoText(todoToEdit.todo);
  };

  // 할일 수정 취소
  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
  };

  // 할일 수정 제출
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
        console.log("리스트 수정하기 실패");
      }
    } catch (error) {
      console.error("리스트 수정하기 에러:", error);
    }
  };

  return (
    <div className={styles["todo-container"]}>
      {/* todoList 제목 */}
      <h2>My TodoList</h2>
      <div className={styles["add-todo"]}>
        {/* todoList 추가 */}
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          data-testid="new-todo-input"
          className={styles["input"]}
        />
        <button
          onClick={handleAddTodo}
          data-testid="new-todo-add-button"
          className={styles["button"]}
        >
          추가
        </button>
      </div>
      {/* todoList 보여주기 */}
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
        className={styles["todo-list"]}
      />
    </div>
  );
};

export default Todo;
