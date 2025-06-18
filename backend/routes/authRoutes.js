import express from "express"
import AuthControllers from "../controller/authController.js"

class AuthRouter {
    constructor() {
        this.router = express.Router()
        this.auth = new AuthControllers()

        this.initRouter()
    }

    initRouter() {
        this.router.post("/login" , this.auth.login)
        this.router.post("/register" , this.auth.register)
        this.router.get("/logout" , this.auth.logout)
    }
 
    getRouter () {
        return this.router
    }
}

const authRouter = new AuthRouter()

export default authRouter.getRouter()