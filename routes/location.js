const router = require('express').Router()
const verify = require('./authentication/verifyToken')
const Location = require('../model/Location')
const User = require('../model/User')

router.post('/add_new', verify, async (req, res) => {
    const permission_needed = 5;
    //TO-DO check if user is priviliged to add locations
    const user = await User.findOne({
        _id: req.user._id
    });

    if(user.permissions!=permission_needed) return res.status(400).send({
        error: "No permission to create new Location!",
        permission_needed: permission_needed,
        user_permission: user.permissions
    })
    
//Check if Location exists
    const locationExists = await Location.findOne({
        name: req.body.name,
        street: req.body.street,
        zip: req.body.zip,
    })
    if (locationExists) return res.status(400).send({
        error: "Location already Exists",
        _id: locationExists._id,
        user: req.user
        })


    //Creating new Location
    const location = new Location({
        public: req.body.public,
        owner: req.body.owner,
        name: req.body.name,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        lcoord: req.body.lcoord,
        bcoord: req.body.bcoord
    })
    
    try{
        const savedLocation = await location.save()
        res.send({
            location_id: location._id
        })
    }catch(err){
        //console.log(err)
        res.status(400).send(err)
    }
})



module.exports = router;