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
            onClick={() => handleSubmitEdit(todo.id)}
            data-testid="submit-button"
          >
            제출
          </button>
          <button onClick={handleCancelEdit} data-testid="cancel-button">
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
            onClick={() => handleDeleteTodo(todo.id)}
            data-testid="delete-button"
          >
            삭제
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
