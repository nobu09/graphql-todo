import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
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
  const [count, setCount] = useState(0)
  const { loading, error, data } = useQuery(GET_TODOS)

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>エラー: {error.message}</p>

  return (
    <div>
      <h>Todoリスト</h>
      <ul>
        {data.todos.map((todo) => (
          <li>todo.name</li>
        ))}
      </ul>
    </div>
  )
}

export default App
