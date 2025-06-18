import Validator from "fastest-validator"

const v = new Validator()

const schema = {
    email: {
        type: "email",
        messages: {
            required: "ایمیل ضروریه ، ایمیل رو ارسال نکردی",
            emailEmpty: "ایمیل خالیه ، ایمیل رو وارد کن",
            email: "ایمیل وارد شده معتبر نیست"
        }
    },
    password: {
        type: "string",
        min: 8,
        max: 20,
        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
        messages: {
            stringMin: "پسورد باید حداقل 8 کاراکتر باشه",
            stringPattern: "پسورد باید حداقل شامل یه حرف کوچیک انگلیسی یه حرف بزرگ و یه عدد باشه"
        }
    },
    //    role: {
    //       type: "enum",
    //       values: ["user", "admin"],
    //       messages: {
    //          required: "نقش کاربر مشخص نیست",
    //          enumValue: "نقش کاربر باید admin یا user باشه"
    //       }
    //    }
}

const validate = v.compile(schema)

const registerValidator = (data) => {
    const result = validate(data)
    
    if (result !== true) {
        const sanitizedErrors = result.map((error) => {
            const { expected, actual, type, ...rest } = error
            return rest
        })
        return sanitizedErrors
    } 
    else {
        return true
    }
}

export default registerValidator
