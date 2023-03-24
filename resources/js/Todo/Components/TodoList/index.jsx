import React, { useContext } from 'react';
import TodoItemsRemaining from '../../Components/TodoItemsRemaining';
import TodoClearCompleted from '../../Components/TodoClearCompleted';
import TodoCompleteAllTodos from '../../Components/TodoCompleteAllTodos';
import TodoFilters from '../../Components/TodoFilters';
import useToggle from '../../Hooks/useToggle';
import { TodosContext } from '../../Context/TodosContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function TodoList() {
  const { todos, setTodos, todosFiltered } = useContext(TodosContext);
  const [isFeaturesOneVisible, setFeaturesOneVisible] = useToggle();
  const [isFeaturesTwoVisible, setFeaturesTwoVisible] = useToggle();

  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  function completeTodo(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEdit(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <>
      <TransitionGroup component="ul" className="mt-8">
        {todosFiltered().map((todo, index) => (
          <CSSTransition key={todo.id} timeout={300} classNames="slide-horizontal">
            <li key={todo.id} className="flex justify-between items-center mt-6">
              <div className="flex items-center flex-1 text-lg mr-6">
                <input
                  type="checkbox"
                  onChange={() => completeTodo(todo.id)}
                  checked={todo.isComplete ? true : false}
                />

                {!todo.isEditing ? (
                  <span
                    onDoubleClick={() => markAsEditing(todo.id)}
                    className={`ml-4 ${
                      todo.isComplete ? 'line-through' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    onBlur={event => updateTodo(event, todo.id)}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        updateTodo(event, todo.id);
                      } else if (event.key === 'Escape') {
                        cancelEdit(event, todo.id);
                      }
                    }}
                    className="ml-2 w-full border-none shadow-md py-[6px] px-2 text-lg"
                    defaultValue={todo.title}
                    autoFocus
                  />
                )}
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="bg-white text-[#6B7280] border-none cursor-pointer hover:text-[#1F2937]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          </CSSTransition> 
        ))}
      </TransitionGroup>

      <div className="my-5 mx-0">
        <button onClick={setFeaturesOneVisible} className="text-[#6B7280] text-sm bg-white border border-[lightgray] p-[6px] rounded-[5px] cursor-pointer">
          Features One Toggle
        </button>
        <button onClick={setFeaturesTwoVisible} className="text-[#6B7280] text-sm bg-white border border-[lightgray] p-[6px] rounded-[5px] cursor-pointer">
          Features Two Toggle
        </button>
      </div>

      <CSSTransition
        in={isFeaturesOneVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="flex justify-between items-center text-[#6B7280] mt-[22px] pt-4 border-t border-[lightgray]">
          <TodoCompleteAllTodos />

          <TodoItemsRemaining />
        </div>
      </CSSTransition>

      <CSSTransition
        in={isFeaturesTwoVisible}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="flex justify-between items-center text-[#6B7280] mt-[22px] pt-4 border-t border-[lightgray]">
          <TodoFilters />
          <div>
            <TodoClearCompleted />
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default TodoList;