import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import  authRouter  from "./routes/authRoutes.js"
import ConnectDb from "./utils/connectDatabase.js"
import todoRouter from "./routes/addTodoRoutes.js"
import { AuthMiddleware } from "./Middleware/authMiddleware.js"
import cookieParser from "cookie-parser"

const __direname = fileURLToPath(import.meta.url)
const __filename = path.dirname(__direname)

export default class App {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000

        this.initMiddleware()
        this.initController()
        this.listen()
    }

    initMiddleware () {
        dotenv.config()

        this.app.use(express.json())
        this.app.use(express.static(path.join(__filename, "../frontend")))
        this.app.use(cookieParser())

        const db = new ConnectDb()

        db.connectDb()
    }

    initController() {
        const authMiddle = new AuthMiddleware()

        this.app.use("/auth", authRouter)
        this.app.use("/todo", todoRouter)

        this.app.get("/login", (req, res) => {
            res.sendFile(path.join(__filename, "../frontend/login.html"))
        })

        this.app.get("/register", (req, res) => {
            res.sendFile(path.join(__filename, "../frontend/register.html"))
        })

        this.app.get("/todo", authMiddle.isAuthenticated, (req, res) => {
            res.sendFile(path.join(__filename, "../frontend/index.html"))
        })
    }

    listen() {
        this.app.listen(this.port, () => console.log(`App listend to : ${this.port}`))
    }
}

new App()