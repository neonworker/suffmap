const router = require('express').Router();
const verify = require('./authentication/verifyToken')
const User = require('../model/User')
var isEqual = require('lodash.isequal')

//Route to edit user data: name, email
router.post('/edit_user', verify, async (req, res) => {

    //find current user obj
    const user = await User.findOne({
        _id: req.user._id
    });

    var edited_user = {};
    //find user to be edited
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

    //check if edited_user is admin
    //only admins can edit admins
    //mods can edit everyone except admins
    //everyone can edit their own user

     if (user._id.equals(edited_user._id) || user.permissions == 0 || user.permissions == 1 && edited_user.permissions != 0) {

        const userCached = edited_user.toObject();

        if (req.body.new_name) edited_user.name = req.body.new_name;
        if (req.body.new_email) edited_user.email = req.body.new_email;

        await edited_user.save();

        //Send results back to client
        res.send({
            message: "User edited",
            new_user: {
                _id: edited_user._id,
                name: edited_user.name,
                email: edited_user.email,
                timestamp: edited_user.updatedAt

            },
            old_user: {
                _id: userCached._id,
                name: userCached.name,
                email: userCached.email,
                timestamp: userCached.updatedAt
            }
        })
    } else {
        res.status(400).send({
            err: "Not allowed to change this user",
            current_user: user._id,
            edited_user: edited_user._id
        })

    }





})


module.exports = router;