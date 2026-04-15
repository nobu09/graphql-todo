module Mutations
  class CreateTodo < Mutations::BaseMutation
    argument :title, String, required: true

    field :todo, Types::TodoType, null: false

    def resolve(title:)
      todo = Todo.create!(title: title, completed: false)
      { todo: todo }
    end
  end
end
