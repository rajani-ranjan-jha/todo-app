import { useState, useEffect } from 'react'
import { getTodos, createTodo, updateTodo, deleteTodo } from './api'
import TodoItem from './components/TodoItem'

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


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">Todo App</h1>

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
              disabled={error}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:cursor-not-allowed disabled:bg-green-300"
            >
              Add
            </button>
          </form>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">No todos yet. Add one properly!</p>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  setError={setError}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
