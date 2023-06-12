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
      {/* 수정버튼 눌렀을 때 */}
      {editingTodoId === todo.id ? (
        <div>
          {/* 수정내용 입력창 */}
          <input
            type="text"
            value={editingTodoText}
            onChange={(e) => setEditingTodoText(e.target.value)}
            data-testid="modify-input"
            className={styles["modify-input"]}
          />
          {/* 수정내용 전송 버튼*/}
          <button
            onClick={() => handleSubmitEdit(todo.id)}
            data-testid="submit-button"
            className={styles["submit-button"]}
          >
            Submit
          </button>
          {/* 수정내용 초기화 버튼*/}
          <button
            onClick={handleCancelEdit}
            data-testid="cancel-button"
            className={styles["cancel-button"]}
          >
            Cancel
          </button>
        </div>
      ) : (
        // 수정버튼 누르기 전에
        <div>
          <label className={styles["label"]}>
            {/* 리스트 수행 완료 체크박스 */}
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleToggleComplete(todo.id)}
              className={styles["checkbox"]}
            />
            <span className={styles["text"]}>{todo.todo}</span>
          </label>
          {/* 수정 버튼 */}
          <button
            onClick={() => handleEditTodo(todo.id)}
            data-testid="modify-button"
            className={styles["modify-button"]}
          >
            Edit
          </button>
          {/* 리스트 삭제 버튼*/}
          <button
            onClick={() => handleDeleteTodo(todo.id)}
            data-testid="delete-button"
            className={styles["delete-button"]}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
