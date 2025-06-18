import express from "express"
import AddTodoListController from "../controller/addTodoController.js"


class TodoRouter {
    constructor() {
        this.router = express.Router()
        this.Todo = new AddTodoListController()

        this.initRouter()
    }

    initRouter() {
        this.router.route("/addTodo")
            .post(this.Todo.saveTodo)
            .get(this.Todo.showAllTodos)
            .delete(this.Todo.deleteTodo)
    }

    getRouter() {
        return this.router
    }
}

const todoRouter = new TodoRouter()

export default todoRouter.getRouter()