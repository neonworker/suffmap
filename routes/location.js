const router = require('express').Router()
const verify = require('./authentication/verifyToken')
const Location = require('../model/Location')

router.post('/add_new', verify, async (req, res) => {
    console.log(req.body)

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