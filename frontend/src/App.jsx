import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import './App.css'

const GET_TODOS = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_TODOS)

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>エラー: {error.message}</p>

  return (
    <div>
      <h1>Todoリスト</h1>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '✅' : '⬜' }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
