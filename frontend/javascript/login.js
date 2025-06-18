class Login {
    constructor() {
        this.email = document.getElementById("email")
        this.password = document.getElementById("password")
        this.btnEl = document.getElementById("btnEl")

        this.init()
    }

    init() {
        this.btnEl.addEventListener("click", (e) => {
            e.preventDefault()
            this.login()
        })
    }

    async login() {
        const obj = {
            email: email.value,
            password: password.value
        }
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': "application/json"
            }
        })

        const data = await res.json()

        if (res.status == 422) {
            data.map(e => {
                alert(e.message)
                console.log(e.message)
            })
        }
        else if (res.status == 404) { 
            data.map((e) => {
                alert(e.message)
            })
        }
        else if (res.status == 401) {
            data.map((e) => {
                alert(e.message)  
            })
        }
        else if (res.status == 200) {
            data.map(e => {
                alert(e.message)
                console.log(e.message)  
                window.location = "/todo"  
            })
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Login()
})