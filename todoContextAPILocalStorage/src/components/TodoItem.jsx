import React, {useState} from "react";
import { useTodoContext } from "../context";

export default function TodoItem({eachTodo}){

    // 2 states are required:- 
    //                  1st for checking if todo is editable
    //                  2nd for updating the todo message
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [updatedTodoMsg, setUpdatedTodoMsg] = useState(eachTodo.todo);
    const {updateTodo, deleteTodo, toggleComplete} = useTodoContext();

    const editTodo = () => {
        updateTodo(eachTodo.id, {...eachTodo, todo: updatedTodoMsg});
        setIsTodoEditable((prev) => !prev)
    }

    const toggleCompletedFunction = (e) => {
        toggleComplete(eachTodo.id);
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                eachTodo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={eachTodo.completed}
                onChange={toggleCompletedFunction}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${eachTodo.completed ? "line-through" : ""}`}
                value={updatedTodoMsg}
                onChange={(e) => setUpdatedTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (eachTodo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={eachTodo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(eachTodo.id)}
            >
                ❌
            </button>
        </div>
    );
}