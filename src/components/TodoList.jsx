import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
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
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editingTodoId={editingTodoId}
          editingTodoText={editingTodoText}
          handleToggleComplete={handleToggleComplete}
          handleEditTodo={handleEditTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleCancelEdit={handleCancelEdit}
          handleSubmitEdit={handleSubmitEdit}
          setEditingTodoText={setEditingTodoText}
        />
      ))}
    </ul>
  );
};

export default TodoList;
