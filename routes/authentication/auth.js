const router = require('express').Router();
const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../../validation');

//Register function
router.post('/register', async (req, res) => {
    
    //Validation of User Input
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user already exists
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email already exists');


    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    //Adding user to the DB
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }; 
})

//Login funktion
router.post('/login', async (req, res) => {

    //Validation of User Input
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');

    //Check if password is correct
    const validPassw = await bcrypt.compare(req.body.password, user.password);
    if(!validPassw) return res.status(400).send('password is wrong');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

    //Store tokens in user 
    await User.findOneAndUpdate({email: req.body.email}, {$push: {tokens: token}}, {new: true})
    
    res.header('auth-token', token).send(token);
});

module.exports = router;