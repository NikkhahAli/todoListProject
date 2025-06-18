import jwt from "jsonwebtoken"

export class AuthMiddleware {
    isAuthenticated(req, res, next) {
        let { token } = req.cookies

        if (!token) {
            return res.redirect("/login")
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)

            req.user = payload
            next()
        }
        catch (error) {
            return res.redirect("/login")
        }
    }
}