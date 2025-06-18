class Register {
    constructor() {
        this.email = document.getElementById("email")
        this.password = document.getElementById("password")
        this.btnEl = document.getElementById("btnEl")

        this.initializeComponent()
    }

    initializeComponent() {
        this.btnEl.addEventListener("click", (e) => {
            e.preventDefault()
            this.registerUser()
        })
    }

    async registerUser() {
        const obj = {
            email: email.value,
            password: password.value
        }

        const res = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        if (res.status == 422) {
            data.map(e => {
                alert(e.message)
            })
        }
        else if (res.status == 409) {
            data.map((e) => {
                alert(e.message)
            })
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Register()
})