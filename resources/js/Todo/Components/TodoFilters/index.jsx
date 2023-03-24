import React, { useContext } from 'react';
import { TodosContext } from '../../Context/TodosContext';

function TodoFilters() {
  const { filter, setFilter, todosFiltered } = useContext(TodosContext);

  return (
    <div>
      <button
        onClick={() => {
          setFilter('all');
          todosFiltered();
        }}
        className={`text-[#6B7280] text-sm bg-white border border-white p-[6px] rounded-[5px] cursor-pointer ${
          filter === 'all' ? '!border-[lightgray]' : ''
        }`}
      >
        All
      </button>
      <button
        onClick={() => {
          setFilter('active');
          todosFiltered();
        }}
        className={`text-[#6B7280] text-sm bg-white border border-white p-[6px] rounded-[5px] cursor-pointer ${
          filter === 'active' ? '!border-[lightgray]' : ''
        }`}
      >
        Active
      </button>
      <button
        onClick={() => {
          setFilter('completed');
          todosFiltered();
        }}
        className={`text-[#6B7280] text-sm bg-white border border-white p-[6px] rounded-[5px] cursor-pointer ${
          filter === 'completed' ? '!border-[lightgray]' : ''
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;