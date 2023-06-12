import styles from "../styles/todoItem.module.css";

const TodoItem = ({
  todo,
  editingTodoId,
  editingTodoText,
  handleToggleComplete,
  handleEditTodo,
  handleDeleteTodo,
  handleCancelEdit,
  handleSubmitEdit,
  setEditingTodoText,
}) => {
  return (
    <li key={todo.id} className={styles["todo-item"]}>
      {editingTodoId === todo.id ? (
        <div>
          <input
            type="text"
            value={editingTodoText}
            onChange={(e) => setEditingTodoText(e.target.value)}
            data-testid="modify-input"
            className={styles["modify-input"]}
          />
          <button
            onClick={() => handleSubmitEdit(todo.id)}
            data-testid="submit-button"
            className={styles["submit-button"]}
          >
            제출
          </button>
          <button
            onClick={handleCancelEdit}
            data-testid="cancel-button"
            className={styles["cancel-button"]}
          >
            취소
          </button>
        </div>
      ) : (
        <div>
          <label className={styles["label"]}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleToggleComplete(todo.id)}
              className={styles["checkbox"]}
            />
            <span className={styles["text"]}>{todo.todo}</span>
          </label>
          <button
            onClick={() => handleEditTodo(todo.id)}
            data-testid="modify-button"
            className={styles["modify-button"]}
          >
            수정
          </button>
          <button
            onClick={() => handleDeleteTodo(todo.id)}
            data-testid="delete-button"
            className={styles["delete-button"]}
          >
            삭제
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
