module Mutations
  class UpdateTodo < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :title, String, required: false
    argument :completed, Boolean, required: false

    field :todo, Types::TodoType, null: false

    def resolve(id:, title: nil, completed: nil)
      todo = Todo.find(id)

      todo.title = title unless title.nil?
      todo.completed = completed unless completed.nil?
      todo.save!

      { todo: todo }
    end
  end
end
