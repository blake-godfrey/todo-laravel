import React, { useContext, useState } from 'react';
import { TodosContext } from '../../Context/TodosContext';

function TodoForm() {
  const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext);

  const [todoInput, setTodoInput] = useState('');

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function addTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
      },
    ]);

    setIdForTodo(prevIdForTodo => prevIdForTodo + 1);

    setTodoInput('');
  }

  return (
    <form action="#" onSubmit={addTodo}>
      <input
        type="text"
        value={todoInput}
        onChange={handleInput}
        className="w-full border-none shadow-md p-[14px] mt-4"
        placeholder="What do you need to do?"
      />
    </form>
  );
}

export default TodoForm;