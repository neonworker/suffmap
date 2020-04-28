const router = require('express').Router();
const verify = require('./authentication/verifyToken')
const User = require('../model/User')

router.post('/edit_user', verify, async (req, res) => {

    //find current user obj
    const user = await User.findOne({
        _id: req.user._id
    });

    // //check if user is priviliged to change permissions
    // if(!permission_needed.includes(user.permissions)) return res.status(400).send({
    //     error: "User is not allowed to change user"
    // });
    
    //find user to be edited
    if(user._id.equals(req.body.edited_user_id)){
        edited_user = user;
        console.log("sameuser")
    }else
    {
        const edited_user = await User.findOne({
        _id: req.body.edited_user_id
    });
}

    //check if user exists
    if(!edited_user) return res.status(400).send({
        error: "User not found",
        edited_user_id: req.body.edited_user_id
    });

    //console.log(edited_user);
    //console.log(user)
    console.log(user._id)
    console.log(edited_user._id)
    console.log(user.permissions)
    console.log(edited_user.permissions)
    //check if edited_user is admin
    //only admins can edit admins
    //mods can edit everyone except admins
    //everyone can edit their own user

    if(user._id.equals(edited_user._id)) console.log(true);

     if(user._id.equals(edited_user._id) /*|| user.permissions == 0 || user.permissions == 1 && edited_user.permissions!=0*/){
         console.log("true");

         const userCached = edited_user;

         if(req.body.new_name) edited_user.name = req.body.new_name;
         if(req.body.new_email) edited_user.email = req.body.new_email;
         if(req.body.new_permissions) edited_user.permissions = req.body.new_permissions;
         
         /*if(userCached.equals(user)) return res.send({
             message: "Nothing has changed"
         })*/
         await edited_user.save();
         res.send({
             message: "User edited",
             user: user
         })
     }

    
    


})


module.exports = router;