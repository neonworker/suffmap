const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    registerValidation,
    loginValidation
} = require('../../validation');

const verify = require('../authentication/verifyToken')
const User = require('../../model/User');
//Register function
router.post('/register', async (req, res) => {

    //Validation of User Input
    const {
        error
    } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user already exists
    const emailExists = await User.findOne({
        email: req.body.email
    });
    if (emailExists) return res.status(400).send('Email already exists');


    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    //Creating a token and assigning it
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET);
    user.token = token

    //Adding user to the DB
    try {

        const savedUser = await user.save();

        return res.header('auth-token', token).send({
            user_id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    };
})

//Login funktion
router.post('/login', async (req, res) => {

    //Validation of User Input
    const {
        error
    } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if email exists
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('Email or password is wrong');

    //Check if password is correct
    const validPassw = await bcrypt.compare(req.body.password, user.password);
    if (!validPassw) return res.status(400).send('password is wrong');

    //Get token from user 
    const token = user.token

    //Sending token and user data to client
    return res.header('auth-token', token).send({
        user_id: user._id,
        name: user.name,
        email: user.email
    });
});

router.post('/change_password', verify, async (req, res) => {
    //find current user
    const user = await User.findOne({
        _id: req.user._id
    });

    var edited_user = {};
    //check if current user is user to be edited
    //only search DB if it isnt
    if (user._id.equals(req.body.edited_user_id)) {
        edited_user = user;
    } else {
        edited_user = await User.findOne({
            _id: req.body.edited_user_id
        });
    }

    //check if user exists
    if (!edited_user) return res.status(400).send({
        error: "User not found",
        edited_user_id: req.body.edited_user_id
    });

    if (user._id.equals(edited_user._id) || user.permissions == 0) {
        if (req.body.new_password) {

            //Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.new_password, salt);

            //Update hashedPassword in DB
            edited_user.password = hashedPassword;

            try{
            const savedUser = await edited_user.save()
            
            return res.status(201).send({
                message:"New password is saved",
                user_id: savedUser._id,
                name: savedUser.name
            })
            }catch(err){
                console.log(err);
                return res.status(400).send(err);
            }

        }
    }else return res.status(400).send({
        err: "Not allowed to make this change",
        user_id: user._id
    })

})

module.exports = router;