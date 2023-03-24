import React, { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import NoTodos from './Components/NoTodos';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import useLocalStorage from './Hooks/useLocalStorage';
import { TodosContext } from './Context/TodosContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Modal from '../../Components/Modal';
import NavigationBar from '../../Components/NavigationBar';

function App() {
  const [name, setName] = useLocalStorage('name', '');

  const nameInputEl = useRef(null);
  const [todos, setTodos] = useLocalStorage('todos', []);

  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

  const [filter, setFilter] = useState('all');

  function todosFiltered() {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    }
  }

  useEffect(() => {
    // console.log('use effect running');
    nameInputEl.current.focus();

    // setName(JSON.parse(localStorage.getItem('name')) ?? '');

    return function cleanup() {
      // console.log('cleaning up');
    };
  }, []);

  function handleNameInput(event) {
    setName(event.target.value);
    // localStorage.setItem('name', JSON.stringify(event.target.value));
  }

  return (
    <>
      <TodosContext.Provider
        value={{
          todos,
          setTodos,
          idForTodo,
          setIdForTodo,
          todosFiltered,
          filter,
          setFilter,
        }}
      >
        <div className="min-h-screen bg-[#f3f4f6]">
          <NavigationBar />

          <div className="m-auto my-[30px] p-8 bg-white rounded shadow-md max-w-lg text-[#374151]">
            <div className="mb-10">
              <h2 className="text-2xl font-bold">What is your name?</h2>
              <form action="#">
                <input
                  type="text"
                  ref={nameInputEl}
                  className="w-full border-none shadow-md p-[14px] mt-4"
                  placeholder="What is your name"
                  value={name}
                  onChange={handleNameInput}
                />
              </form>
              <CSSTransition
                in={name.length > 0}
                timeout={300}
                classNames="slide-vertical"
                unmountOnExit
              >
                <p className="mt-[15px]">Hello, {name}</p>
              </CSSTransition>
            </div>
            <h2 className="text-2xl font-bold">Todo App</h2>
            <TodoForm />

            <SwitchTransition mode="out-in">
              <CSSTransition
                key={todos.length > 0}
                timeout={300}
                classNames="slide-vertical"
                unmountOnExit
              >
                {todos.length > 0 ? <TodoList /> : <NoTodos />}
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      </TodosContext.Provider>

      <Modal />
    </>
  );
}

export default App;

const targetNode = document.getElementById('todo-application');

if (targetNode) {
  const root = createRoot(targetNode);
  root.render(<App />);
}