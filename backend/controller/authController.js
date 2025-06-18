import { User } from "../Models/User.js"
import loginValidator from "../validators/loginValidators.js"
import registerValidator from "../validators/registerValidator.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default class AuthControllers {
    async register(req, res, next) {
        try {
            const { email, password, role } = req.body
            const validationResult = registerValidator(req.body)

            if (validationResult !== true) {
                return res.status(422).json(validationResult)
            }

            const user = await User.findOne({ email })

            if (user) {
                return res.status(409).json([{ message: "user already exit" }])
            }

            const hashPassword = await bcrypt.hash(password, 10)
            await User.create({ email, password: hashPassword })

            res.status(201).json({ message: "created...." })
        }
        catch (error) {
            if (error.code == 11000) {
                return res.status(409).json([{ error: "email is duplicated", field: "email" }])
            }
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body

            const validationResult = loginValidator(req.body)

            if (validationResult !== true) {
                return res.status(422).json(validationResult)
            }

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json([{ message: "user not found with this email", field: "email" }])
            }

            const isValidPassword = await bcrypt.compare(password, user?.password)

            if (!isValidPassword) {
                return res.status(401).json([{ message: "password is wrong", field: "password" }])
            }

            const token = jwt.sign({ email: user.email, role: user.role }, process.env?.JWT_SECRET, {
                expiresIn: '2h'
            })

            // set cookie

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 2 * 60 * 60 * 1000 // 2h 
            })

            res.status(200).json([{ message: "loggined successfully" }])
        }
        catch (error) {
            next(error)
        }
    }

    async logout(req, res) {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 0
        })
        res.redirect("/login")
    }
}