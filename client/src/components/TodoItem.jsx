import React, { useState } from 'react'
import { deleteTodo, updateTodo } from '../api'


function TodoItem({ todo, setError}) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.text)
    const [loading, setLoading] = useState(false)
    const [isCompleted, setIsCompleted] = useState(todo.completed)

    const editTodo = async () => {
        await updateTodo(todo.id, { ...todo, text: todoMsg })
        setIsTodoEditable(false)
    }
    const toggleCompleted = async () => {
        setLoading(true)
        try {
            await updateTodo(todo.id, { completed: !todo.completed })
            setIsCompleted(!isCompleted)
        } catch (err) {
            console.error(err)
            setError('Failed to update todo')
        }
        setLoading(false)
    }

    const Delete = async () => {
        if (!window.confirm("Are you sure?")) return;
        setLoading(true)
        try {
          await deleteTodo(todo.id)
          window.location.reload();
        } catch (err) {
          console.error(err)
          setError('Failed to delete todo')
        }
        setLoading(false)
      }

    return (
        <div
            className={`text-lg text-white flex items-center border border-black/10 rounded-lg px-5 py-3 gap-x-3 shadow-sm text-semibold shadow-white/50 duration-300  ${isCompleted ? "bg-[#23cf13] opacity-50" : "bg-tansparent hover:bg-white/10"
                }`}
        >
            <input
                type="checkbox"
                className=" cursor-pointer w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                checked={isCompleted}
                onChange={toggleCompleted}
            />
            {loading ? (
                <div className="flex justify-center w-full items-center gap-3">
                    <div className="animate-spin h-5 w-1 bg-gray-100 rounded-full"></div>
                    <span className='text-lg font-semibold'>Updating todo...</span>
                </div>                
            ) : (<input
                type="text"
                className={`truncate border outline-none w-full bg-transparent rounded-sm ${isTodoEditable ? "border-white px-2" : "border-transparent"
                    } ${isCompleted ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />)}
            {/* Edit, Save Button */}
            <button
                className={`${isTodoEditable ? 'text-blue-500 hover:text-blue-700' : 'text-yellow-500 hover:text-yellow-700'} w-8 h-8 rounded-lg flex justify-center items-center cursor-pointer p-2 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => {
                    if (isCompleted) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={isCompleted}
            >
                {isTodoEditable ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                    </svg>
                ) : (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>)}
            </button>
            {/* Delete Todo Button */}
            <button
                className="text-red-500 hover:text-red-700 w-8 h-8 rounded-lg flex justify-center items-center cursor-pointer p-2 hover:bg-red-50 transition-colors"
                onClick={() => Delete()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}

export default TodoItem;