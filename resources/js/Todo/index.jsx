import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
const Todo = (props) => {
    return (
        <div>        TODO - Applications
      </div>    );
}
export default Todo;
const targetNode = document.getElementById('todo-application');
if (targetNode) {
    const root = createRoot(targetNode);
    root.render(<Todo />);
}