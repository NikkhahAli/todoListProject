import Validator from "fastest-validator"

const v = new Validator()

const schema = {
    email: {
        type : 'email',
        messages : {
            required : "email is necessary",
            emailEmpty : 'email is empty, enter email',
            email : "email is not valid"
        }
    },
    password: {
        type : 'string',
        min : 8,
        max : 20,
        messages : {
            required : "پسورد ضروریه و پسورد رو ارسال نکردی",
            stringMin : "password must be above 8 character",
            stringMax : "password must be above 20 character",
        }
    },
    
}

const validate = v.compile(schema)

const loginValidator = (data) => {
    const result = validate(data)
    if (result !== true) {
        const sanitizedErrors = result.map((err) => {
            const { expected , actual , type , ...rest } = err
            return rest;
        }) 
        return sanitizedErrors;
    } 
    else {
        return true;
    }
}

export default loginValidator