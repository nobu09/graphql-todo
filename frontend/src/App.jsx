import { useState } from 'react'
import { gql } from '@apollo/client'
import { useQuery, useMutation } from '@apollo/client/react'
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

const CREATE_TODO = gql`
  mutation ($title: String!) {
    createTodo(input: { title: $title }) {
      todo {
        id
        title
        completed
      }
    }
  }
`

const UPDATE_TODO = gql`
  mutation ($id: ID!, $completed: Boolean) {
    updateTodo(input: { id: $id, completed: $completed }) {
      todo {
        id
        title
        completed
      }
    }
  }
`

function App() {
  const [title, setTitle] = useState('')
  const { loading, error, data } = useQuery(GET_TODOS)
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [GET_TODOS],
  })
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [GET_TODOS],
  })

  if (loading) return <p>読み込み中...</p>
  if (error) return <p>エラー: {error.message}</p>

  const handleAdd = () => {
    if (!title) return
    createTodo({ variables: {title} })
    setTitle('')
  }

  return (
    <div>
      <h1>Todoリスト</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいTodo"
      />
      <button onClick={handleAdd}>追加</button>
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
