import React, { useContext } from 'react';
import { TodosContext } from '../../Context/TodosContext';

function TodoCompleteAllTodos() {
  const { todos, setTodos } = useContext(TodosContext);

  function completeAllTodos() {
    const updatedTodos = todos.map(todo => {
      todo.isComplete = true;

      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div>
      <div onClick={completeAllTodos} className="text-[#6B7280] text-sm bg-white border border-[lightgray] p-[6px] rounded-[5px] cursor-pointer">
        Check All
      </div>
    </div>
  );
}

export default TodoCompleteAllTodos;