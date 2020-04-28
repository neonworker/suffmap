//Validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});
return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    
    return schema.validate(data);
    
    };

//Location Validation
// ==>L8er
const locationValidation = (data) =>{
    const schmema = Joi.object({
        
    })
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;