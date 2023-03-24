import React, { useContext } from 'react';
import { TodosContext } from '../../Context/TodosContext';

function TodoClearCompleted() {
  const { todos, setTodos } = useContext(TodosContext);

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  return (
    <button onClick={clearCompleted} className="text-[#6B7280] text-sm bg-white border border-[lightgray] p-[6px] rounded-[5px] cursor-pointer">
      Clear completed
    </button>
  );
}

export default TodoClearCompleted;