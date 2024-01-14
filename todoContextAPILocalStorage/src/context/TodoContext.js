import {useContext, createContext} from "react";

export const todoContext = createContext({
    todos: [
        /* todos list will contain multiple todos like this containing 3 properties */
        {
            id: 1,
            todo: "New todo text",
            completed: false
        },
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {} 
});

export const TodoProvider = todoContext.Provider;

export function useTodoContext(){
    return useContext(todoContext);
} 