import { useState, useEffect } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from './api'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    try {
      const data = await getTodos()
      setTodos(data)
    } catch (err) {
      console.error(err)
      setError('Failed to load todos')
    }
  }

  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    try {
      const newTodo = await createTodo(text)
      setTodos([newTodo, ...todos])
      setText('')
    } catch (err) {
      console.error(err)
      setError('Failed to add todo')
    }
  }

  const handleToggleTodo = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed })
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !completed } : t))
    } catch (err) {
      console.error(err)
      setError('Failed to update todo')
    }
  }

  const handleDeleteTodo = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteTodo(id)
      setTodos(todos.filter(t => t.id !== id))
    } catch (err) {
      console.error(err)
      setError('Failed to delete todo')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Todo App</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleAddTodo} className="mb-8 flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Add
            </button>
          </form>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">No todos yet. Add one properly!</p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 transition-all ${todo.completed ? 'opacity-50' : ''
                    }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id, todo.completed)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span
                      className={`text-lg ${todo.completed
                          ? 'text-gray-500 dark:text-gray-400 line-through'
                          : 'text-gray-800 dark:text-white'
                        }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="ml-2 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
