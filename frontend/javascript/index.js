// const trashBtn = document.getElementsByClassName("fa-trash")

class Main {
    constructor() {
        this.inpEl = document.querySelector(".input")
        this.list = document.querySelector(".list")
        this.trashBtn = document.getElementsByClassName("fa-trash")
        this.item = this.list.getElementsByTagName("li")
        this.aEl = document.querySelector("a")
        
        this.init()
    }

    init() {
        this.showAllTodoList()

        this.aEl.addEventListener("click" , (e) => {
            e.preventDefault()
            this.signOutAccount()
        })

        this.inpEl.addEventListener("keydown" , (e) => {
            if (e.code == "Enter") {
                if (this.inpEl.value !== "") {
                    this.addTodo()
                }
                else {
                    alert("You have to enter something")
                }
            }
        })
    }   

    signOutAccount(){
        window.location = "auth/logout"
    }

    async showAllTodoList () {
        const res = await fetch("http://localhost:3000/todo/addTodo")
        const data = await res.json()

        data.forEach((e) => {
            this.list.innerHTML += `
                <li> 
                    ${e.name} 
                    <i class="fas fa-trash"></i>
                </li>
            `
        })
                                 
        for (let k = 0 ; k < this.item.length ; k++) {
            this.item[k].children[0].addEventListener("click" , async () => {
                const obj = {
                    name : this.item[k].textContent.trim()
                }
                await fetch("http://localhost:3000/todo/addTodo" , {
                    method : "DELETE",
                    body : JSON.stringify(obj),
                    headers : {
                        'Content-Type' : "application/json"
                    }
                })
                if (res.status == 200) {
                    window.location.reload()
                }
            })
        }
    }

    async deleteTodo () {
        const obj = {
            name : this.inpEl.value
        }
        const res = await fetch("http://localhost:3000/todo/addTodo" , {
            method : "DELETE",
            body : JSON.stringify(obj),
            headers : {
                'Content-Type' : "application/json"
            }
        })

        const data = await res.json()

        console.log(data)
    }

    async addTodo () {
        const obj = {
            name : this.inpEl.value
        }

        const res = await fetch("http://localhost:3000/todo/addTodo" , {
            method : "POST",
            body : JSON.stringify(obj),
            headers : {
                'Content-Type' : "application/json"
            }
        })

        const data = await res.json()

        console.log(data)
    }
}

document.addEventListener("DOMContentLoaded" , () => {
    new Main()
})