import { Todo } from "../Models/Todo.js"

export default class AddTodoListController {
    async saveTodo(req, res) {
        const { name } = req.body
        const findTodoName = await Todo.findOne({ name })

        if (findTodoName) {
            return res.status(409).json({ message: "name is already exit" })
        }
        else {
            await Todo.create({ name })
            res.status(201).json({ message: "todo created" })
        }
    }

    async showAllTodos (req , res) {
        const allTodo = await Todo.find()
        return res.status(200).json(allTodo)
    }

    async deleteTodo (req , res) {
        const {name } = req.body
        const findTodo = await Todo.findOne({name})

        if (findTodo) {
            await Todo.deleteOne({name})
            return res.status(200).json([{message : "todo deleted"}])
        }
    }
}